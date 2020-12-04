import './App.css';
import Table1 from './components/table1';
import Table2 from './components/table2';
import Table3 from './components/table3';
import Table4 from './components/table4';
import Table5 from './components/table5';
import Table6 from './components/table6';
import LikeDislike from './components/likeDislike';

function App() {
  return (
    <div className="App">
        <Table6 title={'Table 6: Real pagination'} maxRows={3} details={'This table gets data on every page change, when pressing Previous and Next buttons.'}></Table6>
        <Table5 title={'Table 5: Virtual pagination'} maxRows={3} details={'This example does only one fetch to get all data when the component is loaded.'}></Table5>
        <Table4 title={'Table 4: Real fetch from images json data. (Showing all rows)'}></Table4>
        <Table3 title={'Table 3: Real fetch from back'}></Table3>
        <Table2 title={'Table 2: Show loading ...'}></Table2>
        <Table1 title={'1st table'}></Table1>
        <hr/>
        <LikeDislike></LikeDislike>
    </div>
  );
}

export default App;
