
// Import components
import NavLink from './link.js';
// Import Icons
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { IoWalletOutline } from 'react-icons/io5';
import { AiOutlineLineChart } from 'react-icons/ai';

const Links = () => {
  const links = [
    {
      link: 'summary',
      icon: <IoWalletOutline size="30" color="rgb(39, 39, 42)" />,
      color: 'blue' },
    {
      link: 'income',
      icon: <GiReceiveMoney size="30" color="rgb(39, 39, 42)" />,
      color: 'green' },
    {
      link: 'expenses',
      icon: <GiPayMoney size="30" color="rgb(39, 39, 42)" />,
      color: 'indigo' },
    //{
      //link: 'assets',
      //icon: <AiOutlineLineChart size="30" color="rgb(39, 39, 42)" />,
      //color: 'yellow' },
    //{
      //link: 'debts',
      //icon: <GiImprisoned size="30" color="rgb(39, 39, 42)" />,
      //color: 'red' },
  ];

  return (
    <div className="flex sm:flex-col flex-row">
      {links.map((link, index) => (
        <NavLink key={index}
          path={`/${link.link}`}
          label={link.link}
          color={link.color}
          icon={link.icon} />
      ))}
    </div>
  )
}

export default Links;
