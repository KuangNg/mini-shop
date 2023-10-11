// src/types/member.d.ts
/**
 * 会员中心数据类型定义
 * */

// 通用类型

type commonTpye = {
  /** 用户ID */
  id: number
  /** 头像  */
  avatar: string
  /** 账户名  */
  account: string
  /** 昵称 */
  nickname?: string
}

/** 小程序登录 登录用户信息 */
export type LoginResult = commonTpye & {
  /** 手机号 */
  mobile: string
  /** 登录凭证 */
  token: string
}

/** 个人信息 用户详情信息 */
export type ProfileDetail = commonTpye & {
  /** 性别 */
  gender?: Gender
  /** 生日 */
  birthday?: string
  /** 省市区 */
  fullLocation?: string
  /** 职业 */
  profession?: string
}
/** 性别 */
export type Gender = '女' | '男'

/** 个人信息 修改用户详情信息入参 */
export type ModifyProfileParams = Pick<
  ProfileDetail,
  'nickname' | 'birthday' | 'gender' | 'profession'
> & {
  /**省份编码*/
  provinceCode?: string
  /**城市编码*/
  cityCode?: string
  /**区/县编码*/
  countyCode?: string
}
