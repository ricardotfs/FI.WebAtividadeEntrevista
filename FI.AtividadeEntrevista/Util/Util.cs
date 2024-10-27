using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.Util
{
    public class Util
    {
        public static bool IsValidCpf(string cpf)
        {
            // Remove any non-numeric characters
            cpf = Regex.Replace(cpf, @"\D", "");

            // Check if the CPF length is 11 characters
            if (cpf.Length != 11)
                return false;

            // Check if all digits are the same (e.g., "11111111111" is invalid)
            if (Regex.IsMatch(cpf, @"^(\d)\1{10}$"))
                return false;

            // Validate the first verifying digit
            int sum = 0;
            for (int i = 0; i < 9; i++)
                sum += (cpf[i] - '0') * (10 - i);

            int firstDigit = sum % 11;
            firstDigit = firstDigit < 2 ? 0 : 11 - firstDigit;

            if (cpf[9] - '0' != firstDigit)
                return false;

            // Validate the second verifying digit
            sum = 0;
            for (int i = 0; i < 10; i++)
                sum += (cpf[i] - '0') * (11 - i);

            int secondDigit = sum % 11;
            secondDigit = secondDigit < 2 ? 0 : 11 - secondDigit;

            if (cpf[10] - '0' != secondDigit)
                return false;

            return true;
        }
    }
}
