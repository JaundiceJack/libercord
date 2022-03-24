import Header from './header.js';

const DetailWindow = ({ header, icon, year, prev, next, content, extraClasses }) => {
  return (
    <div className={`flex flex-col h-full ${extraClasses}`} >
      <Header header={header} icon={icon}
        year={year} next={next} prev={prev} />

      <div style={{ minHeight: 500+'px'}}
        className="grow h-full flex mb-8 p-2 rounded-b-lg bg-content " >
        {content}
      </div>
    </div>
  )
}

export default DetailWindow;
