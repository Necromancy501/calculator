const { mathParser } = require('./parser'); // Adjust path as necessary

describe('mathParser', () => {

  describe('Basic Operations', () => {
    test('Addition', () => {
      expect(mathParser('10+5')).toBe('15');
    });

    test('Subtraction', () => {
      expect(mathParser('10-5')).toBe('5');
    });

    test('Multiplication', () => {
      expect(mathParser('10*5')).toBe('50');
    });

    test('Division', () => {
      expect(mathParser('10/5')).toBe('2');
    });

    test('Modulo', () => {
      expect(mathParser('10%3')).toBe('1');
    });

    test('Exponentiation', () => {
      expect(mathParser('2^3')).toBe('8');
    });
  });

  describe('Floating Point Numbers', () => {
    test('Addition with decimals', () => {
      expect(mathParser('10.2+54.2')).toBe('64.4');
    });

    test('Multiplication with decimals', () => {
      expect(mathParser('11.1*9')).toBe('99.9');
    });

    test('Division resulting in zero', () => {
      expect(mathParser('920320.1231231/1*0')).toBe('0');
    });
  });

  describe('Operator Precedence', () => {
    test('Multiplication before addition', () => {
      expect(mathParser('2+3*4')).toBe('14');
    });

    test('Parentheses override precedence', () => {
      expect(mathParser('(2+3)*4')).toBe('20');
    });

    test('Complex expression with precedence', () => {
      expect(mathParser('2+3*4-6/2')).toBe('11');
    });
  });

  describe('Parentheses Handling', () => {
    test('Simple parentheses', () => {
      expect(mathParser('(2+3)')).toBe('5');
    });

    test('Nested parentheses', () => {
      expect(mathParser('(2+(3*4))')).toBe('14');
    });

    test('Multiple parentheses with different operations', () => {
      expect(mathParser('((2+3)*4-(6/2))')).toBe('17');
    });
  });

  describe('Error Handling', () => {
    test.skip('Invalid characters', () => {
      expect(mathParser('10+5a')).toBe('ERROR');
    });

    test('Empty string', () => {
      expect(mathParser('')).toBe('');
    });

    test('Mismatched parentheses', () => {
      expect(mathParser('(2+3')).toBe('ERROR');
    });

    test('Divide by zero', () => {
      expect(mathParser('10/0')).toBe('ERROR');
    });

    test('No operations', () => {
      expect(mathParser('42')).toBe('42');
    });
  });

  describe('Edge Cases', () => {
    test('Single number', () => {
      expect(mathParser('100')).toBe('100');
    });

    test('Multiple zeros', () => {
      expect(mathParser('0+0*0')).toBe('0');
    });

    test.skip('Whitespace handling', () => {
      expect(mathParser('  2  +  3  *  4  ')).toBe('14');
    });

    test('Large numbers', () => {
      expect(mathParser('999999999+1')).toBe('1000000000');
    });

    test('Negative numbers', () => {
      expect(mathParser('10+-5')).toBe('5');
    });
  });

  describe('Negative Number Handling', () => {
    test('Handles negative numbers at the start', () => {
        expect(mathParser('-5+3')).toBe('-2');
    });

    test('Handles negative numbers after operators', () => {
        expect(mathParser('3+-5')).toBe('-2');
    });

    test('Handles multiple operations with negatives', () => {
        expect(mathParser('-2*3+-4')).toBe('-10');
    });

    test('Handles parentheses with negatives', () => {
        expect(mathParser('(-5+3)*-2')).toBe('4');
    });
  });

});
