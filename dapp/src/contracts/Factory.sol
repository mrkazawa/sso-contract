// SPDX-License-Identifier: MIT
pragma solidity >=0.5.1;

contract Factory {
    mapping(address => bool) private _identities;

    //----------------- Events -----------------//

    event IdentityContractAdded(address account);
    event IdentityContractRemoved(address account);

    //----------------- Methods -----------------//

    function isContract() private view returns (bool) {
        if (msg.sender == tx.origin) {
            return false;
        }

        uint32 size;
        address a = msg.sender;
        assembly {
            size := extcodesize(a)
        }

        return (size > 0);
    }

    // FIXME: Anyone freely add a contract, we do not know
    // if the submitted contract is malicious or not.
    //
    // TODO: Change the logic so that after calling this method,
    // another third party is required to check the submitted
    // contract and approve it if not malicious.
    function addIdentityContract() external {
        require(isContract(), "only for contract");
        require(!isIdentityContract(msg.sender), "already registered");

        _identities[msg.sender] = true;

        emit IdentityContractAdded(msg.sender);
    }

    function removeIdentityContract() external {
        require(isContract(), "only for contract");
        require(isIdentityContract(msg.sender), "not registered yet");

        _identities[msg.sender] = false;

        emit IdentityContractRemoved(msg.sender);
    }

    function isIdentityContract(address identity) public view returns (bool) {
        return _identities[identity];
    }

    /**
     * @notice Recover the signer address from the given signature.
     * @param hashedMessage the OTP that has been hashed.
     * @param signature the signature in byte form.
     */
    function recoverAddressFromBytes(
        bytes32 hashedMessage,
        bytes memory signature
    ) public pure returns (address) {
        require(signature.length == 65, "signature length invalid");

        uint8 v;
        bytes32 r;
        bytes32 s;
        (v, r, s) = convertBytesToVRS(signature);
        return recoverAddressFromVRS(hashedMessage, v, r, s);
    }

    function recoverAddressFromVRS(
        bytes32 hashedMessage,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public pure returns (address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedhashedMessage = keccak256(
            abi.encodePacked(prefix, hashedMessage)
        );

        return ecrecover(prefixedhashedMessage, v, r, s);
    }

    function convertBytesToVRS(bytes memory signature)
        private
        pure
        returns (
            uint8,
            bytes32,
            bytes32
        )
    {
        uint8 v;
        bytes32 r;
        bytes32 s;

        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }

        // Version of signature should be 27 or 28,
        // but 0 and 1 are also possible versions
        if (v < 27) {
            v += 27;
        }
        require(v == 27 || v == 28, "signature version not match");

        return (v, r, s);
    }
}
