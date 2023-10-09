// src/services/category.ts
/**
 * 分类接口
 */
import type { CategoryTopItem } from '@/types/categroy'
import { http } from '@/utils/http'
/**
 * 分类列表
 * */
export const getCategoryTopAPI = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
