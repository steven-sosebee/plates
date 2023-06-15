import { useEffect, useRef, useState } from "react";
import ShoppingListItems from "../../classes/shoppingListItem"
import ShoppingList from "../../classes/shoppingList";
import { Recipe } from "../../classes";
import Grocery2 from "../../classes/grocery2";

export const Testing =() => {
    const listItem = useRef();
    const listId = useRef();
    const [data,setData] = useState([]);
    const [listItems, setListItems] = useState([]);
    const recipeName = useRef();
    const recipeDesc = useRef();
    const emailSubject = useRef();
    const emailMessage = useRef();
    const [ep,setEP] = useState();
    const [a, setAuth] = useState();
    const [dh,setDH] = useState();
    const [pnData,setPN] = useState();
    const [status, setStatus] = useState();

    const SECU = async () => {
        const data = await fetch("https://www.ncsecu.org/");
        // const data = await fetch("https://www.ncsecu.org/", {
        //     "headers": {
        //         "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        //         "accept-language": "en-US,en;q=0.9",
        //         "cache-control": "max-age=0",
        //         "content-type": "application/x-www-form-urlencoded",
        //         "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
        //         "sec-ch-ua-mobile": "?0",
        //         "sec-ch-ua-platform": "\"Windows\"",
        //         "sec-fetch-dest": "document",
        //         "sec-fetch-mode": "navigate",
        //         // "sec-fetch-site": "same-origin",
        //         "sec-fetch-user": "?1",
        //         "upgrade-insecure-requests": "1"
        //     },
            // "referrer": "https://onlineaccess.ncsecu.org/O/login.aspx",
            // "referrerPolicy": "strict-origin-when-cross-origin",
            // "body": "va8soBZZJE-a=KI4_z4mb1Em8zzqa-lJBLSauT4gDvXhacW3lSwEJ%3DqMSEL-YvXXGC6aSMYGdJnKmk2fc2xyhSS137hdxbn9_4ozD0RI9oPGEQtFMVx4lX3f2jG_XMwvm6KngPWAKiwz8L4M2vlKf6J7XPvNC1Qnzily41oG4FKJbWO2OMtYxTUovxMinOyEz4OgYqwk_FpY296SiFl12-xs0Mf3vOTo_r4Y_CDRspv7FH2h1gf1tbV1oGbOQ6_JgWz8Gra4Q2vrJ7x-aGXqvmlDnocOX7ILP4KRf6BV-7fbLPQ_xYdv_Skw-9QxGx3SOd7c%3DcJl0TD1L6M-OKCa7PvkmyJp6SGWxWOtG2kpdvHcxLlCApMitRXtOB6np-EX3zCaJFMsl_pc4suERTk67lBSxiCYN32FJink3qbBH8_JTMr2TLyUh73zWNPjA004TOs9949300JGCyuXiMtbEO4XCUrpyIhZL701vSKJUKRqtAQZAb6DhCQt5Blrk_XKAQj2CFcXsQ4nG45ZA30D1K5c1GkOQmBq0dupBwjJHBdRsOlorS-GXQOKGZTubw%3DjPyAiyySlXuC1-n48OHk0QqYb0Ulwb8J4SggHm-R8gcZyECEPmf6yBXFALJ89QVlsUvA1NTwQd9vIjgR5dI7xI-5080bn3DsQ_A%3DE4vSXvdY6I0wG3iPGDHGx7L-2uWCnMT8cX%3DTIvDcAZWayH4Xg3ErhQNwMPnEl7WLEa4TP_TNIQlG62qah1cRaO5mQ0nAzNEdNTf-qD30RT3qKTc1DBvtAInrAyE8Y88K58CFv7fYQ3IBYjIqoYnfAkQv-iTimc8P5t6xFza-_9CJIYkKBasbW_Oc8cMzHd0B6HzPaKRg4JJujIUdO0ua3hHr9gF%3Dq86XF9RmgEB1qI9rgOCgNmPdmlIgtXB%3DIxQZWc-gYTU_AyRQjvtzUySvltnFuNOJbNhnkiVyoOipWNXnSCcQchqvFC-bs717trwld%3DW9zbMk82xaQHGNbqH_MY3koxQdpFwmcHyOt_ny9%3DpHpymfTNc1-XN4c%3DfHAV4Scxmnx04sJVFuKbiI9hh6MBy1qI9n-aI1Jt%3DLVhJEPg2QcuU3UQFnEKsCs-RhIc4IkBun0oBwt2g5kc0AG9XFYHpciPCUOimrdRbSQbxNKRZsFl%3DpTcN_4JQJzWj79NgV3-lzuMJsCxCL8jHF18A9tkkygPvCyFylp_UY98dW8HUD_o4m9FPzSnla2HxoluYU0AgN-dv1U_jFjy8OongGXmJ9TWZS3LPZxGNSmlf0l2-bFd9fvX-axUZ1kJ3Uu%3Dg2Cu-7AZ6tspK5V8B4Dkcg9y1a0smcTAg4-XaVtvRtwQCXx6qR4fO7YIpJM_Ls-_mzY55OFWR1B7WxNNiCyFtOR1At6CY7hKF_RUX7HIZ%3D8BAyMpbpbLtL4rQN8Z6XI56S31XNArEFhjO%3DmJmpyOIfjJwybVqPb9DKw-VMDUPKZVxfw7KTzBMOT%3D-z7qhDrNFPVt5d6785JL7yW4VVVKyVgFxQEtt9MV9ndV2ZtxZlCf2PtY9HvYfQBdX8ID1lmRxc0ZrkXqEH%3DLJOb5Hu6jrqlcotonLgw0N5%3DC5jQcF6CGi4OyAuRjA0qVABKIuD9342%3DPNjpxgjzn1Km%3Dso2UL0SCbQb3vX51r2Lzq7-UuDy820ApdTQvS4ZHTm6cB%3DRu6S38OoNVzu5lvrid3sgZ7yD7Oh%3DMdjXad-IQvDT_i20tU7H5luYFxs7UjagBhrQn6doU5c652fVLlJAccl7WVR5XxaX6FGdTCn-BVXa0z4tIGGAqycD2gcMMI6StZytd0hYunAnNw13UJuoU9Bk3zw6vkhZ3yg3gYGBxUskuG0W5bBBpqo%3DvqLb3YYpn31xufYif6rd1w1O1lyI1Ch_W9woB7d_gwR%3D_iZ6PO2m6wPY6cG5YPGHBicE5wCb0TiIrPZ6DLNi4EaPmBupmFEvgMy5xGRuQg-xOl0VoCiMOmyMokKZlHHtT%3Drdw-ZvbTinJicuTSMD4HKXhlQnH_KQa8d61cjdQru_SRVT2MgXzh0FTlI1CMgz7JnRZXdP59NK4HWV-Bigoi0nrdo3Mxic5uoI%3D7Jl4bPgFPQuzt0iALIUsPrKHh_F66zOqdX4j%3DdIbugvl4v26g3caYngU1CYS6imj0ah2OUsVs3-AoprAbQrdgJ2sL-zmOdTwapJHm3c-uHGBT38m6W6U4Jz7YRbSJj9R7LQr_prPvHszbuPCMpKoD%3D0tnsbYyyBbhuV%3DA1SILfozkD5O5J6T4ZR0CYAt3C6y%3DuG69YMGuFANTmlV2InF-u6JJQ3RosU6P4kamYutJfovPHsL0L7gOFa4yZGUXzzskiXAzPic7gbS8jo_hXuGogL6IGmqID97%3D9zdjiR3yclT-9la8mPOdAfLdqlaykGBHBBV9D_583Fl_9JxLA8wE0y54q4oHlqWpFIlsXrqgSg9x4Joc6uoKK6qRWKBuDQGMWLLbVqRCsiHTrUTDsYBcLtIGCFksvTxmtiFTUu1FlQM_o3XHSQ2--nAFi3Q_jqo_kLzSmKtfs7XqjBHN1gyOjS40fD%3D%3DZJRrctvpNbyohx7cHJS_sEhNvsKfAa5h7rFAnX3kUcmNrSqRk77IFI32wfilY4SnKU0K3RjlDTDGpfE59TPbyhy1AODJd8-T4sr13VGxhXCDOp5GzVU5MI97RVOXutvSJTjoj4rGAx4En-BnV1l6NnTS-CDSrNEkPsH%3DLIvlTI23UyszxPMGFM7m8v7cEzcTpQGO0J4SStQlMTVE-5D9NR2VLWwrb0-BEbWgXCTw%3DxqufA0OWEPpVcZ-R2OtaxvpD4kNi8Qb08HvLTqt_o_ak7T0hX9lwNq1UoMCOinoMRdBmS-co80xMlH4KsobWEn6xEH1NAuDaryrLs%3D_QNX5sOzc-u4dMEwpzZ8fQcCHyRpoQFMFBpUo-cFtqfOpy_DFu979lB1MzkFPDiEjiPG2S%3DL4Fo_nwEhw%3DSpEuXvvc0TnBf1dXNwVCniO0%3DZ2Cx7lKsJzSsEtONybvmcJbNORrnsS8ClLnb3xoO6x72D-ND4isgBSIyXBnnZG6IYVfylDgNkhWK%3DiyS-PQxMpDrmPKX_qP0Eip0R-87uQjVIPaS98YXIn_AfyRiVsX-40tbgTugowRm1myGotidHMXqaHQ6%3DRdhcPxCtGtZOlzXFuPgcS2XOy%3DvKWnCTytaZxFStKzWTxQ6qsxbLLIlfafwa944Cskolr-3uBuV6EmF%3D3HAP849rp2DI8PJwVz3E%3D%3Dn2otSDl44M6UMTnLRxdnoMoUkIkShkh14txoA-qR6OiINxi%3DFomMDhHaZzBRCx0TU-hVwhzhtYt95USDAiy-RbxHCdL2A1v9PS4MmX6vYq834MzUApyK9XNwi49PxkbNYwi87z5fRREAbjifJ5EMkyspZdzPW5Z6WTGKXLHNzgGJhhD%3DyrO9LuxD0O%3D5vd_DG7wj3kr579Q2T4gqbuqKc02f9SnUN2Zuowa_sbmADofNp-9xQuEYJ2x1LTaDoyPvSo5H67BRcNXm6xg-fAKbroQq7SHzhy_oF72P9zEqCopa7CPaappKVAX-UayO8yTBH0N8s%3DFZFdO8Xy4iZ7xqJk6GD7tU%3D5jykRtrvOooHnr9ogHCkX8WSZRF5nN9YFxDWO2bjwCWxwFPjzyCmwmLiVYGZ-gGEMPGksv9vGNsriu_m9p_2VdJCiw144an7yBFBouC%3Dissw1YjO-wzFuN_L1xvfbjqm3uLpxCpDaG4EpUsRHSnqxOPnSAnsos68JEwsHBhl2WCKmg6hy_WCLu68VtGl79kGY1E6wpDJlSJGHRf5xj5_QDIjcAvMlnjw6HhUzPijXss9XdW5tTO5-iCO3SBJIWGdZOu6nQXYZOVQD5kWVlcXk5b2PECM2kbuppq9ib0ONrhAM8369PHcYaNF4V870OnngSidQ84Fb3Wp33zmKbpgr5kSjJm_Zcn1AQk%3D32mMYhjG_sn8-SSV1an3DBHPP3ZUziEuNLxjIiBBAich4E8BS1_yWzLzTWA%3D_gyWjuMNKPHNBhCGJJsPi1k%3DF6Qno3VSAEPdBadsHF7zcQFvl40XlQLOZqaZ9FLzSy4pfXhSjySG4TjQUbqKm59aHCk0UiIicNW8AO-IXB8ICYKJPl7M86hn6pCu2O5oUsWJUaTH9oq739SJiYtPL%3Dr-iNGu7BGKIprzYNQ185mxSBiwz4sSNULwOvMGbV1vJL4bVQOq7PGUCTiHHruVE%3Dm9B9cvUQ-8Mu-CY4dKIGxbWRORcRRHRzqaCzM2YWb8GIqrrij2Q77KKYYAtJnvD5yX-N-FMG-7XN3-f8POnamQkNDBLAsDjmcglRCoEgaAmP-okSbk3tXzC8dKpJdcUoa1y2StPsqMDBimxwcgpagk%3Dk-85mkwpf7JAVGaIDpdhzsrRKmHZ_HQgAyWQv3fqkBbr9GWbHaAo0W7NfBK5yWGG9j0FJGtnD7Q4P14w9gh5YbOBikOsRVkFJUKzKgkrCs-EobA4-Ku3qkF6lA8qEQrM30NzXB5LKdpxu1uKzE_RGyMBq6-3SIGsaELjaolQjo5vA9XcI9bMn5tJVBA0Z%3DjzibB5ZOH%3D1m_ZDd%3DvtZBhVwC-HEJqX97sOIHucDpClNjx2T_tM9kk1xvS_6zfUDkMJd5CYG9jymhhSFufIgqZEcb698pi0SUt70o4oB3D2gqNsJ227oTqxfHtd8QyU0P-vERJPoU6Nz5yQ1sdfiaqonI5twGLpIygy7XwKTq5HcTHItFCs9CKOsC0MWq1qLQO-cOQ3n5G9r8GrOnzGP_RK-dLYhMR1tAl_fnB%3D9fDb1f_tKD8ruD-bzMwxoUWZ8FvTNO3YIbGGFCZYV69VJrWu-li9NF6MUTpwBWh9mynQUw5M7TnbP5DQN7VyYOxRzbybG5Sks7MLSj7rctZrksVB2pD4RL4b2H79EH7FGybtHJQXm-uMi1xPX%3DVxrglFMETi%3D8phWAORN53AnYfEHcr2Z8cqRVwxoH8Ed8DtRUrCj-Vlpd-TbrZsLz4dvQIXYVSxPl4-%3DS6nb0GXRaC0206bz0KGOI9LzBR15XjvgMcMYXEG0Vdzsn2-O2ClV_q3wa-yXDNggiuGxDXEBbGo7FSZK-YhV7WYGp_IpUu8Xpo1Hpg9GunM-6TuGTUXKAqJ78NQM38gTpQ6NRGUb_pZfqm7nZnjv9HdDXUKsU3u-lU1gTuuh-momnHDdq_S5Fr9C6jWUORVt1gSnOZw85QvgJL6n1ydodlAkD-TDVJdP1czykGnIZt9RGR_0uDAwa-nmVXibEEjEVYgRQGvmVZNm7tfY5ZWLfohXd6sCbR9xf09cQBSGLJAtQVHyoB8Z7E0F-f8N9uHfA40Fz4vsPp%3DtnB34RZKpd3Z%3D-n6c6QauVaTfzYgxCONJvSyWWdY-kVKRPx9ALIa%3DhLZmTja9F8JJTnwJklZhGl81V96noz1GDaxGYMjI6KYQcwLx9ARJj5H6oomRNR-6Cc5cZiCpzsEIEBNTRYdzNMjNjtJgv-9j_MfDiWwo88Qn0RlLmrqlnZoiL_n2ldJ6FS4yi0zbAfk2yArs9BCZr54hG0dgkTakTDkHLACuy571Ipkf2m-Ydu55WcPr9xTGXNyv6sCk9IDbg4hvBujidAyP6EnkkQh7rlGornwTE-Q-riTO3wCN%3DTaBkoF15MCKbF3UoVTlYs79yWJVwcYGLV8M_zrd1C6PodZbkJaxv1XrLU_xagvSbCF7OdF6I_KCu%3Dp%3DH1oRQbE1tTDrShZllAcQ7PT%3DdVuT4Ut1YNPCXcb8o2pyIdQ05%3Diyxpd6oYAg0pflrJW2SsfJR3GNS6gx7i7qspYroN19uOTKfcPNigsJk_0XCHEWbwb4SBhQ7V37FY84Q2OsOpqTn9dxBmGIaAVWlsLEtlqHjBsFqWXbUY9zhfSINxc%3D4pP9t7Smox8osHgC4KFkBhf1CRKahn%3Dipmyk_dGwwqnZu7W-vXdPfOH3NkEOyVtJPD9Sgsyn9QL0LEWgLqgvCqA-r79V-b-77_3Lgq5kOth6HyvLMO0sbKmyxHNKC5C3gvLPvzkoImU9POZPrSJzJchlKQZvIV21KwosRiC0qz7nOxxs9RvnGauwvYmXMqvQ3zzd8xZI%3Db8tA8X1py-4VWgtNSpAijCgX6UF014T9QAg5j4HMgA-nlpqazBnkuPqbvUPHV9rsol_Y%3Dq__Svw4gKbQoCzSHmqmFF5yChgBGbN1QshESWiA0Jo9%3DDOUMFstjb_EJyM4C%3Dtx1-ZIGZJjWF7TusPDXjOXYzA-PFTQLX45QqFyil%3DPg42Vi2N_c3A3wsqYb6MV9J_6ZW9OWW9SGyU8S3Z%3DDsJoPmm04R42mU7oxI4pqCyFXiipKVE7pV-l5FRP53QdBazUmtz_Qxk8_OlqGJTo9t6xll6O6d-3TufKnnvvRxfU7%3D4SfQ7QBLRtpq%3D-f5ANrjKiCKscUyPCsptcbiN&va8soBZZJE-z=q&va8soBZZJE-d=ABaAhIjBCKHFgQGAAYIQgISi0aIA5JmhzvpDzz8ABfztEBiaN1cAAAAANbKCcwB_UIKIyh5VdpeJtFNWZbmW&va8soBZZJE-c=AAAbYGSIAQAAVjTwzRxFIk5bQgy9z-iQ-MZsZf6KhOacZk70vwX87RAYmjdX&va8soBZZJE-b=-4sk8lo&va8soBZZJE-f=A8t5ZGSIAQAAHdLWG_7om-1JkTmL-F4-yRF6vUkwrayVt_XUNJ_yzqyK-16AAS0luJeucn0ewH8AAEB3AAAAAA%3D%3D&__EVENTTARGET=btnSubmit&VAM_JSE=1&VAM_Group=&__VIEWSTATE=DkmKaAuWr8XaqP1ezOC1ELGoxNtFm7KWi%2BO2SWx3fu8KF7ldLdjsYZyU%2FTk0ETg31NYDDZJoGt5w%2BFOCW1HTTftHP0EdiP%2FyTs03M4FFsYQisUnIlML9DyV16Qy0EuCl4pTb%2B8%2FvWRkSxJz8iQH4M0rvhYqKd7Rj5svh6gB8W7A9HZXiWL30gdshOuCGCq4h6x8pvheyshuGscbtAgouiE9U7DRUnJjb0FjBjjjDr4BQ0BOhQD2FpM8kMsehGR9YPFdEQpMGr40Ts5NT4HLWMQEXqJHF98dhogWmDvojnvVW%2FQL0BHk20Vtni6DjAx88NFyrc1vq2xkUC5K0XKeYxemUAOqsLE5mhKnbC4KzPIhLeJIeLGAOJwvRImH8%2FSd2XBVLEsksdXBkuF4c%2BGKxOz37QsBMyM3F13grXyGDXY%2Fq8ogbQ6PSC0ErxYhBYCabF7KcrxlEyvaNVeO%2BulDvPCTbs67i1J7Ir0A%2BOuVlYBTZ%2FKE7m0xVBA%2BuT%2FXvOwkGxMtIZjRfk%2BSb1IZvhjOHGXEKTH1OU%2BBs4TgHqMm5bxm24ifZnaqR2ll8w9GiTAzIQ9SG0Z7%2FKBDNbp%2FUldPyp1myKrIy0HHoOEK6%2Fh9HpZ7iPy%2FyJh2%2BtMbIH0l0ovFiewv%2Fc5gFLXbHjzsoc9o%2FQTwnzlK45B%2BPrld63TmmT8KiVB0fPIz6nKZxW%2F7xGJCqIDGtxtubEi%2F%2BGnsNg%2BUhzPZbVF54U7Esifkk%2B1EDzsyzC3g0UX9dtUgDOWJJZdCIw5gglNySBep0LM3TVPQVFvNAzCO%2F0rDAeAfhsq2I5UKl9DovoA0QMhNUDh5x4FJd4hv8dzl3P%2F23HQ3SAu2ZKqnzA%2FUUvem7YnQMnFNAh4nC%2FUIkXyC81ipPWAaHm1s8xtpoag7Vns2eqYlIcOhvV6I0YXt5Ol%2BYZn%2FVfYeQ%2BJN7e77RzJknsgTNLyQUkPf%2BQVGOCgt1TPKkwW2wrcNNvIM6rVWnyi%2FU7RnhQ8c%2BsbntbCN%2B7Sa5m9TWxAb%2BK7Ae34%2BpFPTj1zf2PD1BfnfbKHtGdMqtYEqPupVei0r39Ezx3jU6PqPZlRVscK%2F7BEhchW1zFoLjlCyFLK%2Bju%2BqO3MKhMzyBj29Fg5C5jhQNwaWndy7jnF9HuhfL3vAEecLLQaJ90tEzZVg2YcDDvKXs%2FBwN0dTjHt%2BX3TzLpXVm6WF08d2pFAO90co%2B1rYwuM18WleD0woxiqosyURRiX24XBWYw4pNG8LmIQpC5Zs0P%2BI3zCQfqU3iTpJIgpdjuDIEva99rzYYrJZUCZ3a7mZlKalYU7UujEcVhE%2BUJJ7hb54vyjA7ghJiFmuV%2Bi1jHJHLNM2EU%2BqKP9JpKvKPsjjfXhwnenNEkNjyDSN%2FvjR6p1vjVmpUj1d%2B1TJmK1xYdCaaX%2FCeRcp9XijQBnyPaV9j9Gr49r7wf1e3o8uFm7038xczA0nbP9XAZ%2BSrpPQBdjABp6BU8IrNrVO5RcWE5npthkDrVpUUbi1t4lpWRUuWooD1vuZZ4nUKgQdsnHJvwdXcig4U%2BKaJzqSt6Oduawb1EpSjr95pHAE6kX4BQzLCoLSIv74oiaQFang%2FC1ReLqHiONNJOj3zeyrpnHbwaNT%2BOkdMQFv9p5P4OTK8i7qm6fM60hMcrXbm0O6TpQK7GWe5aeOLXEHVNdbzGT4bryF6m849GTP86C6EabS%2BjSSRCN9dn7Y5BBVNVZdbt5bC0C5T3wHhGw%3D%3D&__VIEWSTATEGENERATOR=00CD9ED1&__VIEWSTATEENCRYPTED=&__EVENTVALIDATION=M2cb4w8O94qKmxDfXgS7ByDQyFY1ugfo%2FJTE%2BaHkX1%2BkbGGKyeBcJqalLzQ28z1oFO1G4C8ASkWJXPRkk8dtrvGulRjnhmlUzJKaKQlxdUeLpwUbUmLhZ8tbZ8HnJOJI64kmoPcTS7Uzr9k0W6HFGIQWgM1Tb442VzS%2BufxjVAhXvjGZ9j2Oxn6mEjsA8Ec%2BImqOf3tZG%2F8hxT5fztoT4hNz0kCuiGD0y0EDKQ55Swj7UggBjxY00uqbUCYr7Vdjy%2BnYYOY23CZFIsj3G2t3Lp%2FJ8I8%3D&ucLogin%24TextboxBrowserName=chrome&ucLogin%24txtUserID=swsosebee&ucLogin%24txtPassword=Ssas0908&ucLogin%24btnSubmit=Submit&hidJSTest=true&userid=swsosebee&password=password&token=&ucLogin%24antiCsrfField=95244222281350191881392191116890128",
        //     "method": "POST",
        //     "mode": "no-cors",
        //     "credentials": "include"
        // });
        const res = data.json();
        console.log(res);

    };

    const testScrape = async() => {
        const data = await fetch("https://www.harristeeter.com/atlas/v1/search/v1/products-search?option.facets=TAXONOMY&option.facets=BRAND&option.facets=NUTRITION&option.facets=MORE_OPTIONS&option.facets=PRICE&option.groupBy=PRODUCT_VARIANT&filter.locationId=09700491&filter.query=swim%20diaper&filter.fulfillmentMethods=IN_STORE&filter.fulfillmentMethods=PICKUP&filter.fulfillmentMethods=DELIVERY&filter.fulfillmentMethods=SHIP&page.offset=0&page.size=24&option.personalization=PURCHASE_HISTORY",
            {headers:{
                "Access-Control-Allow-Origin": "*" ,
                "X-Laf-Object":
[{"fallbackFulfillment":"09700491","createdDate":1684780453603,"destination":{"locationId":"09700491"},"id":"9411b40d-11b2-45cf-a0ff-12975f49c487","isCrossBanner":false,"modalityType":"PICKUP","source":"PROFILE","fulfillment":["09700491"],"isTrustedSource":true},{"fallbackDestination":"09700491","createdDate":1684779239187,"destination":{"address":{"postalCode":"27705","countryCode":"US"},"location":{"lat":36.01940155,"lng":-78.95526886}},"id":"6b4b08ff-a4fb-4f3f-9965-4e5a9420a140","fallbackFulfillment":"309DC309","modalityType":"SHIP","source":"SHIP_AUTOGEN","fulfillment":["309DC309","491DC001","310DC310","DSV00001","MKTPLACE"],"isTrustedSource":false}]
            }});
        const json = await data.json();
        console.log(json);

    }
    const pnTest = async() => {
        let data = {};
        data.bAvailable = {
            serviceworker:('serviceWorker' in navigator), 
            pushManager: ('PushManager' in window),
            Notification: ('Notification' in window)
        };
        const sw = await navigator.serviceWorker.ready;
        data.swReady = sw;
        data.permission = window.Notification.permission;
        // JSON.stringify(data);
        setPN(JSON.stringify(data));
    }
    const pnAccept = async () =>{
        // await window.Notification.requestPermission();
        alert("Push turned on");
    }
    function pnAvailable() {
        var bAvailable = false;
        if (window.isSecureContext) {
            // running in secure context - check for available Push-API
            bAvailable = (('serviceWorker' in navigator) && 
                          ('PushManager' in window) && 
                          ('Notification' in window)); 
            console.log(`bAvailable - ${bAvailable}`)
        } else {
            console.log('site have to run in secure context!');
        }
        alert(`Push is available: ${bAvailable}`)
        return bAvailable;
      }

    const pnUnsubscribe =async () => {
        const sw = await navigator.serviceWorker.ready;
        const sub = await sw.pushManager.getSubscription()
        
        sub.unsubscribe()
        console.log(sub);
    };

    const pnGetSubcription = async () => {

        const sw = await navigator.serviceWorker.ready;
        const sub = await sw.pushManager.getSubscription();
        // const key = sub.getKey("p256dh");
        // const auth = sub.getKey("auth");
      
        // console.log(key);
        // console.log(auth);
        const keys = sub.toJSON();
        const body = {        
            endpoint: keys.endpoint,
            auth: keys.keys.auth,
            p256dh:keys.keys.p256dh
        }
        setEP(keys.endpoint);
        setAuth(keys.keys.auth);
        setDH(keys.keys.p256dh);

        const push = await fetch("/php/test/sub.php",
            {
                "method":"POST",
                "body":JSON.stringify(body)
            });
        const response = await push.json();
        if (push.ok){
            console.log(response)
            console.log(push);
        } else {
            console.log(push.status);

        }
      }

    const pnSubscribe= async () => {
        setStatus('checking if available...');
        if (pnAvailable()) {
            // if not granted or denied so far...
            if (window.Notification.permission === 'default') {
                await window.Notification.requestPermission();
            }
            if (Notification.permission === 'granted') {
                // register service worker
                setStatus('is serviceWorker ready...');
                  const sw = await navigator.serviceWorker.ready;
                  setStatus('serviceWorker ready...');
                  const options = {
                    userVisibleOnly: true,
                    applicationServerKey:"BKCkVGJHHcFpk1yQ6myzQWlSbBZ1-iyxTIsfkMczdD3jlnlr8FDA__W8YSkELh-3W_zR2yzue3cSV7J3FjASzMU"
                    }
                    setStatus('subscribing...');
                    const sub = await sw.pushManager.subscribe(options);
                    setStatus('subscription ready...');
                    const keys = sub.toJSON();
                    const body = {        
                        endpoint: keys.endpoint,
                        auth: keys.keys.auth,
                        p256dh:keys.keys.p256dh
                    }
                    setEP(keys.endpoint);
                    setAuth(keys.keys.auth);
                    setDH(keys.keys.p256dh);
                            }
                        }
                    }
      
      
    const sendMail = async() => {

        
        const res = await fetch(
            `/php/models/eMail.php?subject=${emailSubject.current.value}&message=${emailMessage.current.value}`
        )
        .then(res=>res.json())
        .then(data=>{return data})
        .catch(error=>{return error})

        console.log(res);
    }
    const testRecipeAdd = async () => {
        const recipes = [
            {
                name: recipeName.current.value,
                description: recipeDesc.current.value
            },
            {
                name: `${recipeName.current.value} - new`,
                description: recipeDesc.current.value
            }
        ]
        
        const res = await new Recipe().add(
        recipes
        )
        console.log(res);
    }

    const testAdd = async () => {
        console.log(listItem.current.value);
        const items=[
            {
                groceryId:parseInt(listItem.current.value),
                listId:parseInt(listId.current.value)
            }
        ]
        const res = await new ShoppingListItems().add(items);
        console.log(res);
    }

    const testGetListItems = async(e) => {
        console.log(`Getting list ${e.target.getAttribute('data-list-name')}`);
        const items = await new ShoppingListItems().select(e.target.getAttribute('data-list-name'));
        console.log(items);
        if (items.data.length==0){return setListItems("No items found...")}
        setListItems(items.data);
    }

    const testGetList = async(e) => {
        const res = await new Recipe().list();
        console.log(res);
    }
    const testSelect = async(e) => {
        const res = await new Recipe().list(101);
        console.log(res);
    }

    const testDelete = async(e) => {
        const res = await new Recipe().delete(recipeName.current.value);
        console.log(res);
    }
    // const testDelete = async (e) => {
    //     console.log(`Deleting list ${e.target.getAttribute('data-list-name')}`);
    //     const res = await new ShoppingList().delete(e.target.getAttribute('data-list-name'))
    //     console.log(res);
    //     listAll();
    // }
    const listAll = async () => {
        const res = await new ShoppingList().list();
        setData(res);
    }

    const newConn = async () => {
        const res = await new Grocery2().test();
        console.log(res);
    }
    useEffect(()=>{
        // listAll();
    },[])

    const itemList = () => {
        console.log(listItems);
        if (Array.isArray(listItems)){
            return <table>
                {listItems.map(x=>
                    <tr>
                        <td>{x.groceryName}</td>
                    </tr>)}
            </table>
        }
        return <div>{listItems}</div>
    }

    return (
        <div>
            <div>
                <h1>SECU</h1>
                <input id="id"></input>
                <input id="password"></input>
                <button onClick={SECU}>Login</button>
                <h1>Push Notifications</h1>
                <button onClick={pnTest}>Testing PN</button>
                <p>{pnData}</p>
                <button onClick={pnAccept}>Accept Notifications</button>
                <button onClick={pnSubscribe}>Subscribe</button>
                <button onClick={pnUnsubscribe}>Unsubscribe</button>
                <button onClick={pnGetSubcription}>Get Subscription</button>
                <p>{ep}</p>
                <p>{a}</p>
                <p>{dh}</p>
            </div>
            <div>
                <h1>Web Scrape</h1>
                <button onClick={testScrape}>Scrape</button>
            </div>
            {/* <label>ListItem</label><input ref = {listItem} id="groceryId"></input>
            <label>ListId</label><input ref = {listId} id="listId"></input>

            <button onClick={()=>{testAdd()}}>Test</button>
            <button onClick={()=>{newConn()}}>New Conn Test</button>
            <table>
                {data.map(x=>
                    <tr>
                        <td>{x.list_name}</td>
                        <td><button data-list-name = {x.id} id = {x.id} onClick={testDelete}>Delete</button></td>
                        <td><button data-list-name = {x.id} id = {x.id} onClick={testGetListItems}>Select</button></td>
                    </tr>)}
            </table>
            {itemList()}
            <div>
                <h1>Recipe Model Test</h1>
                <label>Recipe Name</label><input ref={recipeName}></input>
                <label>Description</label><input ref={recipeDesc}></input>
                <button onClick={testRecipeAdd}>Recipe</button>
                <button onClick={testSelect}>Get Recipe</button>
                <button onClick={testGetList}>Get List</button>
                <button onClick={testDelete}>Delete Recipe</button>
            </div>
            <div>
                <input ref={emailSubject}/>
                <input ref={emailMessage}/>
                <button onClick={sendMail}>Send Mail</button>
            </div> */}
        </div>
        
    )
}