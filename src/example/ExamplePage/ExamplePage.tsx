// import React from 'react';
// import { observer } from 'mobx-react';
// import classNames from 'classnames';
//
// export const ExamplePage = observer(() => {
//     const {
//         viewPort: { isMobileSize: isMobile },
//     } = useStore([ViewPortState.Name]);
//     const {
//         data,
//         count,
//         columns,
//         filteredInfo,
//         presetFilters,
//         onRow,
//         loadMore,
//         onTableChange,
//         onFiltersChange,
//         getIsArchiveStatus,
//         onEntryClick,
//     } = useEntryListPage();
//     const { tableData, mobileFields } = useEntryMobileCard();
//
//     return (
//         <div className={style.root}>
//             {isMobile ? (
//                 <MobileCardList
//                     data={tableData}
//                     onCardClick={onEntryClick}
//                     fields={mobileFields}
//                     loadMoreItems={loadMore}
//                 />
//             ) : (
//                 <RedesignedTable
//                     onRow={onRow}
//                     rowClassName={record =>
//                         getIsArchiveStatus(record)
//                             ? classNames([tableStyles.redesigned_table_row, tableStyles.redesigned_table_grey_row])
//                             : tableStyles.redesigned_table_row
//                     }
//                     rowKey={value => value.id}
//                     selectedFilters={filteredInfo}
//                     presetFiltersParams={presetFilters}
//                     onFiltersChange={onFiltersChange}
//                     onChange={onTableChange}
//                     dataSource={data}
//                     onLoadMore={loadMore}
//                     count={count}
//                     columns={columns}
//                 />
//             )}
//         </div>
//     );
// });
