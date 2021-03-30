import ManageNavButton from './manageNavButton';

const ManageNav = ({currentSection, changeSection}) => {
  return (
    <div className="ml-1 sm:ml-10 flex items-baseline space-x-1 sm:space-x-4">
      <ManageNavButton text="Summary" value="summary" changeSection={changeSection} extraClasses={currentSection === 'summary' ? "border-green-400" : ""} />
      <ManageNavButton text="Expenses" value="expenses" changeSection={changeSection} extraClasses={currentSection === 'expenses' ? "border-green-400" : ""} />
      <ManageNavButton text="Income" value="income" changeSection={changeSection} extraClasses={currentSection === 'income' ? "border-green-400" : ""} />
      <ManageNavButton text="Assets" value="assets" changeSection={changeSection} extraClasses={currentSection === 'assets' ? "border-green-400" : ""}  />
      <ManageNavButton text="Liabilities" value="liabilities" changeSection={changeSection} extraClasses={currentSection === 'liabilities' ? "border-green-400" : ""} />
    </div>
  );
};

export default ManageNav;
