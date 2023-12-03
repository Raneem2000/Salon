import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FQAApi } from "./FQAApi";

const GetAllFqaQuery = () => {
  const queryResult = useQuery({
    queryKey: ["get-all-fqa"],
    queryFn: async () => {
      const data = await FQAApi.GetAllFQA();
      return data;
    },
  });
  return queryResult;
};

const GetFqaByIdQuery = (id: string | undefined) => {
  const queryResult = useQuery({
    queryKey: ["get-fqa-by-id", id],
    queryFn: async () => {
      const data = await FQAApi.GetFQAById(id);
      return data;
    },
    enabled: !!id,
  });
  return queryResult;
};

const SetFqaQuery = () => {
  const queryClient = useQueryClient();

  const queryResult = useMutation({
    mutationKey: ["set-fqa"],
    mutationFn: FQAApi.SetFQA,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-fqa"] });
    },
  });
  return queryResult;
};

const DeleteFqaQuery = () => {
  const queryClient = useQueryClient();

  const queryResult = useMutation({
    mutationKey: ["delete-fqa"],
    mutationFn: FQAApi.DeleteFQA,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-fqa"] });
    },
  });
  return queryResult;
};

export const FQAQueries = {
  GetAllFqaQuery,
  GetFqaByIdQuery,
  SetFqaQuery,
  DeleteFqaQuery,
};
