// SPDX-License-Identifier: MIT
pragma solidity >=0.5.1;

//import "./IRegistry.sol";

contract Factory {
    address private _owner;
    mapping(address => bool) private _identityContracts;

    //----------------- Events -----------------//

    event IdentityContractAdded(address account);

    //----------------- Modifiers -----------------//

    modifier onlyOwner() {
        require(isOwner(msg.sender), "only for owner");
        _;
    }

    //----------------- Methods -----------------//

    constructor() public {
        _owner = msg.sender;
    }

    function isOwner(address account) public view returns (bool) {
        return (_owner == account);
    }

    /*function isContract(address account) internal view returns (bool) {
        // NOTE: this method is direct copy from OpenZeppelin
        // 
        // This method relies on extcodesize/address.code.length, which returns 0
        // for contracts in construction, since the code is only stored at the end
        // of the constructor execution.

        return account.code.length > 0;
    }*/

    function addIdentityContract(address account) external onlyOwner {
        // TODO:
        // remove is owner
        // check if this method is called by contract
        // check if this method has valid signature
        // check if this method is not registered yet

        _identityContracts[account] = true;
        emit IdentityContractAdded(account);
    }

    function isIdentityContract(address account) public view returns (bool) {
        return _identityContracts[account];
    }
}
