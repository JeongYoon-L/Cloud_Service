import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import {selectedSnapshot} from "../recoil";
import {FileSharingSnapShotData} from "../recoil";
import {GroupMembershipSnapshotsData} from "../recoil";
import {selectedCheckSnapshot} from "../recoil";
import {useRecoilState} from "recoil";
import { checkRequirements } from "../functions/ac-requirements"
import { getClosestGMSnapshots } from "../functions/gm-snapshots"

const classes = {
  flexContainer: 'ReactVirtualizedDemo-flexContainer',
  tableRow: 'ReactVirtualizedDemo-tableRow',
  tableRowHover: 'ReactVirtualizedDemo-tableRowHover',
  tableCell: 'ReactVirtualizedDemo-tableCell',
  noClick: 'ReactVirtualizedDemo-noClick',
};

const columns = [
    { field: 'fileName', headerName: 'FileName', width: 70 },
    { field: 'violationType', headerName: 'ViolationType', width: 200 },
    { field: 'message', headerName: 'Message', width: 200 },
];


const styles = ({ theme }) => ({
  // temporary right-to-left patch, waiting for
  // https://github.com/bvaughn/react-virtualized/issues/454
  '& .ReactVirtualized__Table__headerRow': {
    ...(theme.direction === 'rtl' && {
      paddingLeft: '0 !important',
    }),
    ...(theme.direction !== 'rtl' && {
      paddingRight: undefined,
    }),
  },
  [`& .${classes.flexContainer}`]: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  [`& .${classes.tableRow}`]: {
    cursor: 'pointer',
  },
  [`& .${classes.tableRowHover}`]: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  [`& .${classes.tableCell}`]: {
    flex: 1,
  },
  [`& .${classes.noClick}`]: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight , fontSize : '14px'}}
        align={'center'}
        // {
        //   (columnIndex != null && columns[columnIndex].numeric) || false
        //     ? 'right'
        //     : 'left'
        // }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight , fontSize : '15px' }}
        // align={columns[columnIndex].numeric || false ? 'right' : 'left'}
        align = {'center'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = styled(MuiVirtualizedTable)(styles);

// ---

const sample = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3.9],
];


function createData(id, dessert, calories, fat, carbs, protein) {
  return { id, dessert, calories, fat, carbs, protein };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

export default function ViolationModal(props) {
    const [GroupSharing,setGroupSharing] = useRecoilState(GroupMembershipSnapshotsData);
    const [checkSnapShot, setCheckSnapShot] = useRecoilState(selectedCheckSnapshot);

    let closestGMSnapShotsData = getClosestGMSnapshots(GroupSharing, checkSnapShot)
    let checkRequirement = checkRequirements(checkSnapShot, closestGMSnapShotsData, props.components.ACR_data, props.components.userData.email, props.components.userData.domain, props.components.userData.driveType )
    console.log(checkRequirement)

    let ch_req_obj = [] 
    checkRequirement.map((req) => {
        let fileName = req.file.name;
        for(let i = 0 ;i < req.data.length; i++){
            ch_req_obj.push(
                {
                    fileName : fileName,
                    violationType : req.data[i].violationType,
                    message : req.data[i].message,
                }
            )
        } 
    });

    console.log(ch_req_obj);

  return (
    <Paper style={{ height: 400, width: '100%'}}>
      <VirtualizedTable
        rowCount={ch_req_obj.length}
        rowGetter={({ index }) => ch_req_obj[index]}
        columns={[
          {
            width: 270,
            label: 'File Name',
            dataKey: 'fileName',
          },
          {
            width: 170,
            label: 'Violation Type',
            dataKey: 'violationType',
            numeric: true,
          },
          {
            width: 450,
            label: 'Message',
            dataKey: 'message',
            numeric: true,
          }
        ]}
      />
    </Paper>
  );
}