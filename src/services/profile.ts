import type { ModifyProfileParams, ProfileDetail } from '@/types/member'
import { http } from '@/utils/http'
/**
 * 获取个人信息
 * */
export const getMemberProfileAPI = () => {
    return http<ProfileDetail>({
        method: "GET",
        url: "/member/profile"
    })
}
/**
 * 修改个人信息
 * */
export const modifyMemberProfileAPI = (data: ModifyProfileParams) => {
    return http<ProfileDetail>({
        method: "PUT",
        url: "/member/profile",
        data
    })
}
