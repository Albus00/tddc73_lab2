// Import all card icons
// @ts-ignore This import is working fine
import visa from '../assets/images/visa.png';
// @ts-ignore This import is working fine
import mastercard from '../assets/images/mastercard.png';
// @ts-ignore This import is working fine
import amex from '../assets/images/amex.png';
// @ts-ignore This import is working fine
import discover from '../assets/images/discover.png';
// @ts-ignore This import is working fine
import troy from '../assets/images/troy.png';
// Add more imports as needed

// Export the desired card icon
export default function getCardIcon(cardNumber: string) {
  const cardType = (number: string) => {
    let re = new RegExp("^4");
    if (number.match(re) != null) return "visa";

    re = new RegExp("^(34|37)");
    if (number.match(re) != null) return "amex";

    re = new RegExp("^5[1-5]");
    if (number.match(re) != null) return "mastercard";

    re = new RegExp("^6011");
    if (number.match(re) != null) return "discover";

    re = new RegExp('^9792')
    if (number.match(re) != null) return 'troy'

    return "visa"; // default type
  };

  // remove all # from card number
  cardNumber = cardNumber.replace(/#/g, '');
  const cardCompany = cardType(cardNumber);

  switch (cardCompany) {
    case 'visa':
      return visa;
    case 'mastercard':
      return mastercard;
    case 'amex':
      return amex;
    case 'discover':
      return discover;
    case 'troy':
      return troy;
    default:
      return visa;
  }
}