import type { CartItem, addCartParams, modifyCartItemParams } from '@/types/cart'
import { http } from '@/utils/http'

/**
 * @description 加入购物车
 * */
export const postAddCartAPI = (data: addCartParams) => {
  return http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}
/**
 * @description 获取购物车列表
 * */
export const getMemberCartAPI = () => {
  return http<CartItem[]>({
    method: 'GET',
    url: '/member/cart',
  })
}

/**
 * 删除/清空购物车单品
 * @param data 请求体参数 ids SKUID 集合
 */
export const deleteMemberCartAPI = (data: { ids: string[] }) => {
  return http({
    method: 'DELETE',
    url: '/member/cart',
    data,
  })
}

/**
 * 修改购物车单品
 * @param skuId SKUID
 * @param data selected 选中状态 count 商品数量
 */
export const putMemberCartBySkuIdAPI = (skuId: string, data: modifyCartItemParams) => {
  return http({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data,
  })
}

/**
 * 修改购物车全选状态
 * @param data selected 选中状态
 */
export const putMemberCartSelectAllAPI = (selected: boolean) => {
  return http({
    method: 'PUT',
    url: '/member/cart/selected',
    data: { selected },
  })
}
