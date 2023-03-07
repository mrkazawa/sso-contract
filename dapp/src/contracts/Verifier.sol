// SPDX-License-Identifier: MIT
pragma solidity >=0.5.1;

contract Verifier {
    /**
     * @notice Verify whether the given address sign the message.
     * @param hashedMessage the OTP that has been hashed.
     * @param signature the signature in byte form.
     * @param signer the address of the original signer.
     */
    function verifySignatureFromBytes(
        bytes32 hashedMessage,
        bytes memory signature,
        address signer
    ) public pure returns (bool) {
        require(signature.length == 65, "signature length invalid");

        uint8 v;
        bytes32 r;
        bytes32 s;
        (v, r, s) = convertBytesToVRS(signature);

        return verifySignatureFromVRS(hashedMessage, v, r, s, signer);
    }

    /**
     * @notice Verify whether the given address sign the message.
     * @param hashedMessage the OTP that has been hashed.
     * @param v the v part of signature.
     * @param r the r part of signature.
     * @param s the s part of signature.
     * @param signer the address of the original signer.
     */
    function verifySignatureFromVRS(
        bytes32 hashedMessage,
        uint8 v,
        bytes32 r,
        bytes32 s,
        address signer
    ) public pure returns (bool) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedhashedMessage = keccak256(
            abi.encodePacked(prefix, hashedMessage)
        );
        address addressFromSig = ecrecover(prefixedhashedMessage, v, r, s);

        return addressFromSig == signer;
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
