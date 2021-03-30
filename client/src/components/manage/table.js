// Import Material Table Icons/Functions
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
// Connect Material Table icon functions
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Table = ({ data, columns, onDelete }) => {
  return (
    <div className="w-full rounded-md p-0 sm:p-3 bg-gradient-to-br from-gray-700 to-gray-500 ring-2 ring-gray-500">
      <MaterialTable
        title=""
        icons={tableIcons}
        columns={columns}
        data={data}
        actions={[{
          icon: Clear,
          tooltip: 'Remove',
          onClick: (event, row) => { onDelete(row._id) }
        }]}
        options={{
          actionsColumnIndex: 5,
          rowStyle: rowData => ({
            backgroundColor: "#FFF"
          }),
          headerStyle: {
            backgroundColor: '#ABC',
            color: '#222',
            fontWeight: 'bold'
          },
          exportButton: true,
          padding: 'dense',
          search: data.length > 5 ? true : false,
          searchFieldAlignment: 'left',
        }}
        localization={{
          header: {
              actions: 'Edit'
          },
          body: {
              emptyDataSourceMessage: 'No records to display'
          }
        }} />
    </div>
  )
};

export default Table;
