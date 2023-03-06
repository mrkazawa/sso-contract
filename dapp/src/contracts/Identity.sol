// SPDX-License-Identifier: MIT
pragma solidity >=0.5.1;

//import "./IRegistry.sol";

contract Identity {
    address private _owner;
    mapping(address => bool) private _keys;

    //----------------- Events -----------------//

    event KeyAdded(address account);

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

    function addKey(address account) external onlyOwner {
        _keys[account] = true;
        emit KeyAdded(account);
    }

    function isKey(address account) public view returns (bool) {
        return _keys[account];
    }
}
