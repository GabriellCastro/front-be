"use client";

import React, { FC, useEffect, useState } from "react";
import { CaretDown, MagnifyingGlass } from "@phosphor-icons/react";
import { ComplexTable } from "@/components/Table";
import { createColumn } from "react-chakra-pagination";
import { format } from "date-fns";
import { useFetch } from "@/hooks/useFetch";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { Avatar } from "@chakra-ui/react";
import { Employee } from "@/utils/types/employee";

const DashboardPage: FC = () => {
  const [windowSize, setWindowSize] = useState({
    width: null as number | null,
    height: null as number | null,
  });

  const { register, watch } = useForm();

  const { data: dataEmployees } = useFetch<Employee[]>("/employees");

  const search = watch("search");

  const dataEmployeesFiltered =
    dataEmployees?.filter(
      (employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.job.toLowerCase().includes(search.toLowerCase())
    ) ?? dataEmployees;

  const employees = dataEmployeesFiltered?.map((employee: any) => ({
    avatar: <Avatar src={employee.image} name={employee.name} size={"sm"} />,
    name: employee.name,
    job: employee.job,
    admission_date: format(new Date(employee.admission_date), "dd/MM/yyyy"),
    phone: employee.phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"),
    action: <CaretDown size={"20px"} color="#5A84C0" />,
  }));

  const columnHelper = createColumn<(typeof employees)[]>();

  const columns = [
    columnHelper.accessor("avatar", {
      cell: (info) => info.getValue(),
      header: "Foto",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Nome",
    }),
    columnHelper.accessor("job", {
      cell: (info) => info.getValue(),
      header: "Cargo",
    }),
    columnHelper.accessor("admission_date", {
      cell: (info) => info.getValue(),
      header: "Data de admissão",
    }),
    columnHelper.accessor("phone", {
      cell: (info) => info.getValue(),
      header: "Telefone",
    }),
  ];

  const columnsMobile = [
    columnHelper.accessor("avatar", {
      cell: (info) => info.getValue(),
      header: "Foto",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Nome",
    }),
    columnHelper.accessor("action", {
      cell: (info) => info.getValue(),
      header: "",
    }),
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mt-4 container">
      <div
        className="flex items-center 
          sm:flex-row flex-col w-full mb-4
          justify-between
          "
      >
        <h1 className="ml-2 text-2xl font-bold">Funcionários</h1>
        <div className="w-96">
          <Input
            name="search"
            type="text"
            register={register}
            description="Buscar por nome ou cargo"
            icon={<MagnifyingGlass size={24} color="#DFDFDF" />}
          />
        </div>
      </div>
      <ComplexTable
        tableData={employees}
        columns={
          windowSize.width && windowSize.width < 768 ? columnsMobile : columns
        }
      />
    </div>
  );
};

export default DashboardPage;
