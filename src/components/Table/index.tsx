import { FC } from "react";

import { Table } from "react-chakra-pagination";
import { Database } from "@phosphor-icons/react";

interface Props {
  tableData: any;
  columns: any;
}

export const ComplexTable: FC<Props> = ({ tableData, columns }) => {
  return (
    <div
      className="md:w-full h-full flex items-center justify-center
       rounded-md mt-3 mb-6 border-[1px] 
       overflow-auto"
    >
      <Table
        colorScheme="blue"
        emptyData={{
          icon: <Database size="64" color="#5A84C0" />,
          text: "Nenhuma transação encontrada!",
          noShadow: true,
        }}
        totalRegisters={tableData?.length ?? 50}
        itemsPerPage={8}
        initialPage={1}
        onPageChange={(page: any) => console.log(page)}
        columns={columns}
        data={tableData ?? []}
      />
    </div>
  );
};
