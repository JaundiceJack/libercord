import Header from './header.js';

const GraphWindow = ({ year, prev, next, content, extraClasses }) => {
  return (
    <div className={`flex flex-col h-full ${extraClasses}`} >
      <Header year={year} next={next} prev={prev} />

      <div style={{ minHeight: 500+'px'}}
        className="flex h-full items-center justify-center p-2 bg-content rounded-b-lg mb-8  " >
        {content}
      </div>
    </div>
  )
}

export default GraphWindow;
