// SPDX-License-Identifier: MIT
pragma solidity >=0.5.1;

//import "./IRegistry.sol";

contract Identity {
    address private _owner;

    uint256 public _threshold;
    mapping(address => bool) private _keys;

    //----------------- Events -----------------//

    event KeyAdded(address account);

    //----------------- Modifiers -----------------//

    modifier onlyOwner() {
        require(isOwner(msg.sender), "only for owner");
        _;
    }

    //----------------- Methods -----------------//

    constructor(uint256 threshold, address[] memory accounts) public {
        require(
            threshold > 0 && threshold <= accounts.length,
            "invalid threshold value"
        );

        for (uint256 i = 0; i < accounts.length; i++) {
            _keys[accounts[i]] = true;
        }

        _threshold = threshold;
        _owner = msg.sender;
    }

    function isOwner(address account) public view returns (bool) {
        return (_owner == account);
    }

    function addKey(address account) external onlyOwner {
        _keys[account] = true;
        emit KeyAdded(account);
    }

    function verifySignature(
        uint8[] memory sigV,
        bytes32[] memory sigR,
        bytes32[] memory sigS,
        bytes32 data
    ) public view returns (bool) {
        require(
            sigV.length == sigR.length &&
                sigV.length == sigS.length &&
                sigV.length == _threshold,
            "invalid signature length"
        );

        for (uint256 i = 0; i < _threshold; i++) {
            address recovered = ecrecover(data, sigV[i], sigR[i], sigS[i]);
            if (!isKey(recovered)) {
                return false;
            }
        }
        return true;
    }

    function isKey(address account) public view returns (bool) {
        return _keys[account];
    }
}
