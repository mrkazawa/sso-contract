// SPDX-License-Identifier: MIT
pragma solidity >=0.5.1;

import "./SafeMath.sol";

contract SafeMathTest {
    function add(uint256 a, uint256 b) external pure returns (uint256) {
        return SafeMath.add(a, b);
    }

    function sub(uint256 a, uint256 b) external pure returns (uint256) {
        return SafeMath.sub(a, b);
    }

    function mul(uint256 a, uint256 b) external pure returns (uint256) {
        return SafeMath.mul(a, b);
    }

    function div(uint256 a, uint256 b) external pure returns (uint256) {
        return SafeMath.div(a, b);
    }

    function mod(uint256 a, uint256 b) external pure returns (uint256) {
        return SafeMath.mod(a, b);
    }
}
