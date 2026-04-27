// SPDX-License-Identifier: MIT
#![cfg_attr(not(feature = "std"), no_std, no_main)]

/// @title ProofPay Contract
/// @notice Verifiable payment history for freelancers and small businesses.
#[ink::contract]
mod proofpay {
    use ink::storage::Mapping;
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;

    /// Error types for ProofPay
    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        NotOwner,
        NoFunds,
        TransferFailed,
        InvalidAmount,
    }

    pub type Result<T> = core::result::Result<T, Error>;

    /// Status of a payment record
    #[derive(scale::Decode, scale::Encode, Debug, Clone, PartialEq, Eq)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout))]
    pub enum PaymentStatus {
        Paid,
        Pending,
        Disputed,
    }

    /// Structure representing a payment record
    #[derive(scale::Decode, scale::Encode, Debug, Clone)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct PaymentRecord {
        client: AccountId,
        amount: Balance,
        concept: String,
        timestamp: Timestamp,
        status: PaymentStatus,
    }

    #[ink(storage)]
    pub struct ProofPay {
        owner: AccountId,
        total_volume: Balance,
        total_records: u32,
        // Records indexed by the freelancer (owner of the history)
        payments: Mapping<AccountId, Vec<PaymentRecord>>,
    }

    #[ink(event)]
    pub struct PaymentRecorded {
        #[ink(topic)]
        freelancer: AccountId,
        #[ink(topic)]
        client: AccountId,
        amount: Balance,
        concept: String,
    }

    impl ProofPay {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                owner: Self::env().caller(),
                total_volume: 0,
                total_records: 0,
                payments: Mapping::default(),
            }
        }

        /// Records a new payment on-chain
        #[ink(message, payable)]
        pub fn record_payment(&mut self, client: AccountId, concept: String) -> Result<()> {
            let freelancer = self.env().caller();
            let amount = self.env().transferred_value();
            let timestamp = self.env().block_timestamp();

            if amount == 0 {
                return Err(Error::InvalidAmount);
            }

            let record = PaymentRecord {
                client,
                amount,
                concept: concept.clone(),
                timestamp,
                status: PaymentStatus::Paid,
            };

            let mut user_payments = self.payments.get(freelancer).unwrap_or_default();
            user_payments.push(record);
            self.payments.insert(freelancer, &user_payments);

            self.total_volume += amount;
            self.total_records += 1;

            self.env().emit_event(PaymentRecorded {
                freelancer,
                client,
                amount,
                concept,
            });

            Ok(())
        }

        /// Returns all payments for a specific freelancer
        #[ink(message)]
        pub fn get_payments(&self, user: AccountId) -> Vec<PaymentRecord> {
            self.payments.get(user).unwrap_or_default()
        }

        /// Returns global statistics
        #[ink(message)]
        pub fn get_stats(&self) -> (u32, Balance, Balance) {
            (
                self.total_records,
                self.total_volume,
                self.env().balance(),
            )
        }

        /// Admin withdrawal
        #[ink(message)]
        pub fn withdraw(&mut self) -> Result<()> {
            if self.env().caller() != self.owner {
                return Err(Error::NotOwner);
            }
            let balance = self.env().balance();
            if balance == 0 {
                return Err(Error::NoFunds);
            }
            if self.env().transfer(self.owner, balance).is_err() {
                return Err(Error::TransferFailed);
            }
            Ok(())
        }
    }
}
