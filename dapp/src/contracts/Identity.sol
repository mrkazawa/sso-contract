// SPDX-License-Identifier: MIT
pragma solidity >=0.5.1;
pragma experimental ABIEncoderV2;

import "./Factory.sol";

contract Identity {
    Factory private _factory;
    uint256 public _threshold;
    mapping(address => bool) private _keys;

    //----------------- Events -----------------//

    event KeyAdded(address key);
    event KeyDeleted(address key);

    //----------------- Methods -----------------//

    constructor(
        Factory factory,
        uint256 threshold,
        address[] memory keys
    ) public {
        require(keys.length > 0, "invalid number of keys");
        require(
            threshold > 0 && threshold <= keys.length,
            "invalid threshold value"
        );

        for (uint256 i = 0; i < keys.length; i++) {
            _keys[keys[i]] = true;
        }

        _threshold = threshold;
        _factory = factory;
    }

    function registerToFactory(bytes32 hashedMessage, bytes[] memory signatures)
        external
    {
        require(verify(hashedMessage, signatures), "invalid multi signatures");

        _factory.addIdentityContract();
    }

    function deregisterFromFactory(
        bytes32 hashedMessage,
        bytes[] memory signatures
    ) external {
        require(verify(hashedMessage, signatures), "invalid multi signatures");

        _factory.removeIdentityContract();
    }

    function addKey(
        address key,
        bytes32 hashedMessage,
        bytes[] memory signatures
    ) external {
        require(verify(hashedMessage, signatures), "invalid multi signatures");

        _keys[key] = true;

        emit KeyAdded(key);
    }

    function deleteKey(
        address key,
        bytes32 hashedMessage,
        bytes[] memory signatures
    ) external {
        require(verify(hashedMessage, signatures), "invalid multi signatures");

        _keys[key] = false;

        emit KeyDeleted(key);
    }

    function verify(bytes32 hashedMessage, bytes[] memory signatures)
        public
        view
        returns (bool)
    {
        require(signatures.length == _threshold, "not enough signature");

        for (uint256 i = 0; i < _threshold; i++) {
            address recovered = _factory.recoverAddressFromBytes(
                hashedMessage,
                signatures[i]
            );
            if (!isKey(recovered)) {
                return false;
            }
        }
        return true;
    }

    function isKey(address key) public view returns (bool) {
        return _keys[key];
    }
}
