import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { EmployeeApi } from "./EmployeeApi";

const GetEmployeAllQuery = (salonId: string) => {
  const queryResult = useQuery({
    queryKey: ["get-all-employee", salonId],
    queryFn: async () => {
      const data = await EmployeeApi.GetEmpoleeAll(salonId);
      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResult;
};
const GetEmployeAutoCompleteQuery = (salonId: string) => {
  const queryResult = useQuery({
    queryKey: ["get-auto-employee", salonId],
    queryFn: async () => {
      const data = await EmployeeApi.GetEmpoleeAll(salonId);
      return data;
    },
    select: (data) =>
      data.map((d) => {
        return {
          id: d.id,
          name: d.empName,
        };
      }),
  });

  return queryResult;
};
const SetEmpQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["set-emp"],
    mutationFn: EmployeeApi.SetEmployee,
  });
  return queryResult;
};
const SetEmpServiceQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["set-emp-serv"],
    mutationFn: EmployeeApi.SetEmployeeService,
  });
  return queryResult;
};
const GetEmpDetailsQuery = (id: string) => {
  const queryResult = useQuery({
    queryKey: ["get-emp-details", id],
    queryFn: async () => {
      const data = await EmployeeApi.GetEmpDetails(id);
      return data;
    },
    enabled: !!id,
  });
  return queryResult;
};
const GetEmpDetailsServQuery = (id: string) => {
  const queryResult = useQuery({
    queryKey: ["get-emp-service-details", id],
    queryFn: async () => {
      const data = await EmployeeApi.GetEmpDetailsService(id);
      return data;
    },
    enabled: !!id,
    select: (data) => data.services,
  });
  return queryResult;
};
const DeleteEmpService = () => {
  const queryResult = useMutation({
    mutationKey: ["delete-emp-serv"],
    mutationFn: EmployeeApi.DeleteEmployeeServ,
  });
  return queryResult;
};
const EmployeeQureis = {
  GetEmployeAllQuery,
  DeleteEmpService,
  SetEmpQuery,
  GetEmpDetailsQuery,
  GetEmpDetailsServQuery,
  SetEmpServiceQuery,
  GetEmployeAutoCompleteQuery,
};
export default EmployeeQureis;
