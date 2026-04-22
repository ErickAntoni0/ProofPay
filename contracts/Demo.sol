// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Demo — Contrato de demostración para AI Web3 Dashboard
/// @notice Permite a los usuarios registrar mensajes y leer datos on-chain
contract Demo {
    // ──────────────────────────────────────────────
    // State
    // ──────────────────────────────────────────────
    address public owner;
    uint256 public totalInteractions;

    struct UserRecord {
        string  message;
        uint256 timestamp;
        uint256 value;
    }

    mapping(address => UserRecord[]) private userRecords;
    mapping(address => uint256)      public userInteractionCount;

    // ──────────────────────────────────────────────
    // Events
    // ──────────────────────────────────────────────
    event MessageStored(address indexed user, string message, uint256 value, uint256 timestamp);
    event Withdrawal(address indexed to, uint256 amount);

    // ──────────────────────────────────────────────
    // Modifiers
    // ──────────────────────────────────────────────
    modifier onlyOwner() {
        require(msg.sender == owner, "Demo: not owner");
        _;
    }

    // ──────────────────────────────────────────────
    // Constructor
    // ──────────────────────────────────────────────
    constructor() {
        owner = msg.sender;
    }

    // ──────────────────────────────────────────────
    // Write functions
    // ──────────────────────────────────────────────

    /// @notice Almacena un mensaje junto con el ETH enviado (opcional)
    function storeMessage(string calldata _message) external payable {
        require(bytes(_message).length > 0, "Demo: empty message");
        require(bytes(_message).length <= 280, "Demo: message too long");

        userRecords[msg.sender].push(
            UserRecord({
                message:   _message,
                timestamp: block.timestamp,
                value:     msg.value
            })
        );

        userInteractionCount[msg.sender]++;
        totalInteractions++;

        emit MessageStored(msg.sender, _message, msg.value, block.timestamp);
    }

    // ──────────────────────────────────────────────
    // Read functions
    // ──────────────────────────────────────────────

    /// @notice Devuelve todos los registros de un usuario
    function getRecords(address _user)
        external
        view
        returns (UserRecord[] memory)
    {
        return userRecords[_user];
    }

    /// @notice Devuelve el último mensaje de un usuario
    function getLastMessage(address _user)
        external
        view
        returns (string memory message, uint256 timestamp, uint256 value)
    {
        UserRecord[] storage records = userRecords[_user];
        require(records.length > 0, "Demo: no records");
        UserRecord storage last = records[records.length - 1];
        return (last.message, last.timestamp, last.value);
    }

    /// @notice Devuelve estadísticas globales del contrato
    function getStats()
        external
        view
        returns (
            uint256 _totalInteractions,
            uint256 _contractBalance,
            address _owner
        )
    {
        return (totalInteractions, address(this).balance, owner);
    }

    // ──────────────────────────────────────────────
    // Admin
    // ──────────────────────────────────────────────

    /// @notice Retira el ETH acumulado en el contrato
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Demo: nothing to withdraw");
        (bool ok, ) = payable(owner).call{value: balance}("");
        require(ok, "Demo: transfer failed");
        emit Withdrawal(owner, balance);
    }

    receive() external payable {}
}
