const { mathParser } = require("./parser"); // Adjust path as necessary

describe("mathParser", () => {
  describe("Basic Operations", () => {
    test("Addition", () => {
      expect(mathParser("10+5")).toBe("15");
    });

    test("Subtraction", () => {
      expect(mathParser("10-5")).toBe("5");
    });

    test("Multiplication", () => {
      expect(mathParser("10*5")).toBe("50");
    });

    test("Division", () => {
      expect(mathParser("10/5")).toBe("2");
    });

    test("Modulo", () => {
      expect(mathParser("10%3")).toBe("1");
    });

    test("Exponentiation", () => {
      expect(mathParser("2^3")).toBe("8");
    });
  });

  describe("Floating Point Numbers", () => {
    test("Addition with decimals", () => {
      expect(mathParser("10.2+54.2")).toBe("64.4");
    });

    test("Multiplication with decimals", () => {
      expect(mathParser("11.1*9")).toBe("99.9");
    });

    test("Division resulting in zero", () => {
      expect(mathParser("920320.1231231/1*0")).toBe("0");
    });
  });

  describe("Operator Precedence", () => {
    test("Multiplication before addition", () => {
      expect(mathParser("2+3*4")).toBe("14");
    });

    test("Parentheses override precedence", () => {
      expect(mathParser("(2+3)*4")).toBe("20");
    });

    test("Complex expression with precedence", () => {
      expect(mathParser("2+3*4-6/2")).toBe("11");
    });
  });

  describe("Parentheses Handling", () => {
    test("Simple parentheses", () => {
      expect(mathParser("(2+3)")).toBe("5");
    });

    test("Nested parentheses", () => {
      expect(mathParser("(2+(3*4))")).toBe("14");
    });

    test("Multiple parentheses with different operations", () => {
      expect(mathParser("((2+3)*4-(6/2))")).toBe("17");
    });
  });

  describe("Error Handling", () => {
    test.skip("Invalid characters", () => {
      expect(mathParser("10+5a")).toBe("ERROR");
    });

    test("Empty string", () => {
      expect(mathParser("")).toBe("");
    });

    test("Mismatched parentheses", () => {
      expect(mathParser("(2+3")).toBe("ERROR");
    });

    test("Divide by zero", () => {
      expect(mathParser("10/0")).toBe("ERROR");
    });

    test("No operations", () => {
      expect(mathParser("42")).toBe("42");
    });
  });

  describe("Edge Cases", () => {
    test("Single number", () => {
      expect(mathParser("100")).toBe("100");
    });

    test("Multiple zeros", () => {
      expect(mathParser("0+0*0")).toBe("0");
    });

    test.skip("Whitespace handling", () => {
      expect(mathParser("  2  +  3  *  4  ")).toBe("14");
    });

    test("Large numbers", () => {
      expect(mathParser("999999999+1")).toBe("1000000000");
    });

    test("Negative numbers", () => {
      expect(mathParser("10+-5")).toBe("5");
    });
  });

  describe("Negative Number Handling", () => {
    test("Handles negative numbers at the start", () => {
      expect(mathParser("-5+3")).toBe("-2");
    });

    test("Handles negative numbers after operators", () => {
      expect(mathParser("3+-5")).toBe("-2");
    });

    test("Handles multiple operations with negatives", () => {
      expect(mathParser("-2*3+-4")).toBe("-10");
    });

    test("Handles parentheses with negatives", () => {
      expect(mathParser("(-5+3)*-2")).toBe("4");
    });
  });
});

describe("mathParser - Additional Tests", () => {
  describe("Complex Expressions", () => {
    test("Mixed operations with parentheses", () => {
      expect(mathParser("3+(6*2)-4^2/2")).toBe("7");
    });

    test("Multiple nested parentheses", () => {
      expect(mathParser("((2+3)*(4-1))+(6/(1+2))")).toBe("17");
    });

    test("Mix of negative and positive numbers", () => {
      expect(mathParser("-3+4*-2+5")).toBe("-6");
    });
  });

  describe("Negative Numbers and Edge Cases", () => {
    test("Standalone negative number", () => {
      expect(mathParser("-42")).toBe("-42");
    });

    test("Negative result from subtraction", () => {
      expect(mathParser("5-10")).toBe("-5");
    });

    test("Negative base with exponentiation", () => {
      expect(mathParser("(-2)^3")).toBe("-8");
    });

    test("Negative number after parentheses", () => {
      expect(mathParser("(3+4)*-2")).toBe("-14");
    });

    test("Negative division", () => {
      expect(mathParser("-10/2")).toBe("-5");
    });
  });

  describe("Floating Point Precision", () => {
    test("Floating point addition with many decimals", () => {
      expect(mathParser("0.1+0.2")).toBe("0.3"); // Relying on rounding in your implementation
    });

    test("Floating point subtraction", () => {
      expect(mathParser("5.5-2.2")).toBe("3.3");
    });

    test("Floating point multiplication", () => {
      expect(mathParser("1.1*1.1")).toBe("1.21");
    });

    test("Floating point division", () => {
      expect(mathParser("1.0/3.0")).toBe("0.33");
    });
  });

  describe("Large Numbers", () => {
    test("Very large addition", () => {
      expect(mathParser("999999999+999999999")).toBe("1999999998");
    });

    test("Very large multiplication", () => {
      expect(mathParser("100000*100000")).toBe("10000000000");
    });

    test("Exponentiation with large base and exponent", () => {
      expect(mathParser("10^8")).toBe("100000000");
    });
  });

  describe("Error Handling and Invalid Input", () => {
    test.skip("Unrecognized character in input", () => {
      expect(mathParser("10+5a")).toBe("ERROR");
    });

    test("Multiple operators in a row", () => {
      expect(mathParser("10++5")).toBe("ERROR");
    });

    test("Trailing operator", () => {
      expect(mathParser("10+")).toBe("ERROR");
    });

    test("Leading operator", () => {
      expect(mathParser("+10")).toBe("ERROR");
    });

    test("Mismatched parentheses", () => {
      expect(mathParser("(2+3")).toBe("ERROR");
    });

    test("Divide by zero in complex expression", () => {
      expect(mathParser("10/(5-5)")).toBe("ERROR");
    });
  });

  describe.skip("Whitespace Handling", () => {
    test("Expression with extra spaces", () => {
      expect(mathParser("  2  +  3  *  4  ")).toBe("14");
    });

    test("Negative numbers with spaces", () => {
      expect(mathParser("  -3  +  4  ")).toBe("1");
    });

    test("Spaces between parentheses", () => {
      expect(mathParser("(  2  +  3  ) *  4")).toBe("20");
    });
  });

  describe("Special Cases", () => {
    test("Expression with only parentheses", () => {
      expect(mathParser("((()))")).toBe("");
    });

    test("Expression with multiple consecutive negative signs", () => {
      expect(mathParser("5--5")).toBe("10");
    });

    test("Multiple modulo operations", () => {
      expect(mathParser("10%3%2")).toBe("1");
    });

    test("Expression with redundant parentheses", () => {
      expect(mathParser("(((2+3)))")).toBe("5");
    });

    test("Expression with redundant operators", () => {
      expect(mathParser("10+--5")).toBe("15");
    });
  });
});
