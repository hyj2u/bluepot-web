import { useAxios } from "@/_https/_config";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useTanstackQuery() {
  const queryClient = useQueryClient();
  const axiosInstance = useAxios();

  return {
    axiosInstance,
    queryKeys,
    queryClient,
    useQuery,
    useMutation,
    useInfiniteQuery,
  };
}

const queryKeys = {
  verify: "app-user-verify-key",
  store: {
    all: "app-store-all-key",
    detail: "app-store-detail-key",
    연결정보: "app-store-conects-key",
    백업단말기: "app-store-backupNumbers-key",
    정산정보: "app-store-receipts-key",
    create: {
      brandCd: "app-store-create-brandCd-key",
      files1: "app-store-create-files1-key",
      files2: "app-store-create-files2-key",
      images: "app-store-create-images-key",
    },
  },
  calculate: {
    connect: {
      table: "app-calculate-conect-key",
      gb: "app-calculate-conect-gb-key",
    },
    auto: { table: "app-calculate-auto-key" },
    view: {
      table: "app-calculate-view-key",
      detail: "app-calculate-view-detail-key",
      storeOptions: "app-calculate-view-create-store-key",
    },
    edit: {
      columnFilter: "app-calculate-column-filter-key",
      category: "app-calculate-choice-category-key",
      table: "app-calculate-edit-key",
    },
    receipts: {
      all: "app-calculate-receipts-key",
      list: "app-calculate-receipts-list-key",
      publish: "app-calculate-receipts-publish-key",
      view: "app-calculate-receipts-view-key",
    },
  },
  users: {
    all: "app-users-list-key",
    detail: "app-users-detail-key",
    mypage: "app-users-mypage-key",
  },
};
