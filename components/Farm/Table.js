import dayjs from 'dayjs';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-magnus';
import { DataTable } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { dataTableHeadings } from '../../constants/dataTableConstants';
import { deleteData } from '../../features/data/dataThunk';

const Table = ({ data, farmId, openModal }) => {
  const dispatch = useDispatch();

  const tableBody = data.map((rowData, index) => {
    const objectKeys = Object.keys(rowData).filter(
      (key) => key !== 'uuid' && key !== 'farmFk'
    );

    onPressHandler = () => {
      console.log('press handler');

      dispatch(deleteData({ farmId, dataId: rowData.uuid }));
      //   const filteredData = data
      //     .filter((d) => d.product === rowData.product)
      //     .sort(
      //       (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      //     );

      //   let previousData;

      //   if (filteredData.length > 1) {
      //     const index = filteredData.findIndex(
      //       (data) => data.uuid === rowData.uuid
      //     );
      //     previousData = index > 0 && filteredData[index - 1];
      //   }

      //   openModal(rowData, previousData);
    };

    return (
      <DataTable.Row key={index} testID={`Row-${index}`}>
        <Button block bg="white" p="none" onPress={onPressHandler}>
          {objectKeys.map((key, i) => {
            if (key.toLowerCase().includes('date')) {
              return (
                <DataTable.Cell key={`${index}-${i}`} style={styles.cell}>
                  {dayjs(rowData[key]).format('DD-MMM-YY')}
                </DataTable.Cell>
              );
            }

            const cellStyling =
              key.toLowerCase() === 'comments'
                ? styles.commentCell
                : styles.cell;
            return (
              <DataTable.Cell style={cellStyling} key={`${index}-${i}`}>
                {rowData[key]}
              </DataTable.Cell>
            );
          })}
        </Button>
      </DataTable.Row>
    );
  });

  const tableHeadings = dataTableHeadings.map((heading) => {
    const cellStyling =
      heading.toLowerCase() === 'comments' ? styles.commentCell : styles.cell;

    return (
      <DataTable.Title style={cellStyling} key={heading}>
        {heading}
      </DataTable.Title>
    );
  });

  return (
    <ScrollView horizontal style={styles.container}>
      <View>
        <DataTable style={styles.table}>
          <DataTable.Header>{tableHeadings}</DataTable.Header>
          {tableBody}
        </DataTable>
      </View>
    </ScrollView>
  );
};
export default Table;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  table: {
    backgroundColor: 'white',
  },
  cell: {
    width: 80,
    justifyContent: 'center',
  },
  commentCell: {
    width: 200,
    justifyContent: 'center',
  },
});
