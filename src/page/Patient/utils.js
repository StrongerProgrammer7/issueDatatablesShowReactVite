// @ts-nocheck
import css from './profile.module.css';

import { isExistsData, createButton, isDoctorHaveAccess, getReadyDate } from '../total_utlls';
import DataTables from "datatables.net";

import "datatables.net-select";
import 'datatables.net-responsive';
import 'datatables.net-searchpanes';
import 'datatables.net-scroller';



export function createButtonForAccess(list_doctors_have_access, id)
{
    let button = `<div class='btn-group'>`;
    if (isDoctorHaveAccess(list_doctors_have_access, id) > -1)
        button += ` ${ createButton("btn btn-danger btn-sm", "btn_action_revokeAccess", "Забрать доступ") }`
    else
        button += `${ createButton("btn btn-info btn-sm", "btn_action_giveAccess", "Дать доступ") }`
    button += createButton("btn btn-primary btn-sm", "btn_moreInfo", "О враче") + `</div>`
    return button;
}

export function addActionForListDoctors(data, list_doctors_have_access = '')
{
    if (!data) return data;

    for (let i = 0; i < data.length; i++)
        data[i].action = createButtonForAccess(list_doctors_have_access, data[i].id);

    return data;
}

function addActionForListIlls(listIlls_object)
{
    if (!listIlls_object) return undefined;
    let data = listIlls_object;
    for (let i = 0; i < data.length; i++)
    {
        data[i].num = i + 1;
        data[i].action = createButton("btn btn-info btn-sm", "btn_moreInfo_ill", "Больше информации");
        if (isExistsData(data[i], 'date_cured'))
            data[i].date_cured = getReadyDate(data[i].date_cured)

        if (isExistsData(data[i], 'date_ill'))
            data[i].date_ill = getReadyDate(data[i].date_ill);
    }
    return data;

}

export function changeButton(button, deleteClass, addClass, newId, textContent)
{
    button.classList.remove(deleteClass);
    button.classList.add(addClass);
    button.id = newId;
    button.textContent = textContent;
}


const prepare_ills = [
    {
        "id": 38,
        "name_ill": "кашель",
        "treatment": "Сироп",
        "classification": "местные болезни",
        "date_ill": "2023-05-11 04:56:00",
        "date_cured": "2024-01-17 17:34:00",
        "status": "Cured",
        "num": 1,
        "action": "<button class='btn btn-info btn-sm' id='btn_moreInfo_ill'>Больше информации</button>"
    },
    {
        "id": 62,
        "name_ill": "простуда",
        "treatment": "Бинты",
        "classification": "травмы",
        "date_ill": "2024-01-17 17:53:00",
        "date_cured": null,
        "status": "ill",
        "num": 2,
        "action": "<button class='btn btn-info btn-sm' id='btn_moreInfo_ill'>Больше информации</button>"
    }
];
export async function getTableAllIlls(tableIllsRef, user, dispatch = null)
{
    const dt_ills = new DataTables(tableIllsRef.current,
        {
            responsive: true,
            data: prepare_ills,
            columns: [
                { data: "num" },
                { data: 'name_ill' },
                { data: 'treatment' },
                { data: 'classification' },
                { data: 'date_ill' },
                { data: 'date_cured' },
                { data: 'status' },
                { data: 'action' },
                { data: 'id' }
            ],

            searchPanes:
            {
                cascadePanes: true,
                dtOpts:
                {
                    info: true
                },
                viewCount: true,
                collapse: true,
                initCollapsed: true,
                layout: 'columns-2',
            },
            dom: 'Plfrtip',
            columnDefs: [
                {
                    sClass: css.hide_columns,
                    aTargets: [8]
                },
                {
                    searchPanes:
                    {
                        show: true
                    },
                    targets: [3, 6]
                },
                {
                    searchPanes:
                    {
                        show: false
                    },
                    targets: [0, 1, 2, 4, 5, 7]
                }

            ],
            scrollY: 300,
            scrollX: 100,
            deferRender: true,
            scroller: true
        });
    return dt_ills;
}

const prepare_data = [
    {
        "num": 1,
        "id": 50,
        "initials": "Gilberg G. ",
        "mail": "",
        "profession": "анестезиолог-реаниматолог",
        "city": "Краснодар",
        "meta": "0xf902031a076d77d2f651639d017449c1abaee9a5",
        "action": "<div class='btn-group'><button class='btn btn-info btn-sm' id='btn_action_giveAccess'>Дать доступ</button><button class='btn btn-primary btn-sm' id='btn_moreInfo'>О враче</button></div>"
    },
    {
        "num": 2,
        "id": 51,
        "initials": "Martin M. ",
        "mail": "sw82@mail.ru",
        "profession": "гинеколог",
        "city": "Краснодар",
        "meta": "0x88c0b0db901028e7234ca4c3d9fa29d7dd45bbe7",
        "action": "<div class='btn-group'><button class='btn btn-info btn-sm' id='btn_action_giveAccess'>Дать доступ</button><button class='btn btn-primary btn-sm' id='btn_moreInfo'>О враче</button></div>"
    },
    {
        "num": 3,
        "id": 54,
        "initials": "Kiol G. ",
        "mail": "",
        "profession": "дезинфекционист",
        "city": "Краснодар",
        "meta": "0xf3a613168ff438e52308ee69110e845b21f20f27",
        "action": "<div class='btn-group'><button class='btn btn-info btn-sm' id='btn_action_giveAccess'>Дать доступ</button><button class='btn btn-primary btn-sm' id='btn_moreInfo'>О враче</button></div>"
    },
    {
        "num": 4,
        "id": 65,
        "initials": "Гласов А. ",
        "mail": "doc@mail.ru",
        "profession": "терапевт",
        "city": "Краснодар",
        "meta": "0x9014f82e4bbeae8a15b5a04365dba68016248355",
        "action": "<div class='btn-group'><button class='btn btn-info btn-sm' id='btn_action_giveAccess'>Дать доступ</button><button class='btn btn-primary btn-sm' id='btn_moreInfo'>О враче</button></div>"
    },
    {
        "num": 5,
        "id": 67,
        "initials": "Стью Г. ",
        "mail": "doctor@mail.ru",
        "profession": "анестезиолог-реаниматолог",
        "city": "Краснодар",
        "meta": "0xed0eb96960a6875d918b830c6fb35c86bfd20d7d",
        "action": "<div class='btn-group'> <button class='btn btn-danger btn-sm' id='btn_action_revokeAccess'>Забрать доступ</button><button class='btn btn-primary btn-sm' id='btn_moreInfo'>О враче</button></div>"
    },
    {
        "num": 6,
        "id": 52,
        "initials": "Sort C. ",
        "mail": "",
        "profession": "онколог",
        "city": "Москва",
        "meta": "0x367c24cab9453d9f4bf34ce5f1c0c1b4f73b55ab",
        "action": "<div class='btn-group'><button class='btn btn-info btn-sm' id='btn_action_giveAccess'>Дать доступ</button><button class='btn btn-primary btn-sm' id='btn_moreInfo'>О враче</button></div>"
    },
    {
        "num": 7,
        "id": 55,
        "initials": "Kolt S. ",
        "mail": "",
        "profession": "травматолог",
        "city": "Москва",
        "meta": "0xc537ecceb6d2f7fccde75db3dc96c325a23a8573",
        "action": "<div class='btn-group'><button class='btn btn-info btn-sm' id='btn_action_giveAccess'>Дать доступ</button><button class='btn btn-primary btn-sm' id='btn_moreInfo'>О враче</button></div>"
    },
    {
        "num": 8,
        "id": 56,
        "initials": "Kiol Q. ",
        "mail": "",
        "profession": "терапевт",
        "city": "Москва",
        "meta": "0x4346161f372fe92b58824f219fd696000bf329a9",
        "action": "<div class='btn-group'><button class='btn btn-info btn-sm' id='btn_action_giveAccess'>Дать доступ</button><button class='btn btn-primary btn-sm' id='btn_moreInfo'>О враче</button></div>"
    },
    {
        "num": 9,
        "id": 57,
        "initials": "Uyt G. ",
        "mail": "",
        "profession": "эпидемиолог",
        "city": "Москва",
        "meta": "0x21887da3ea5692e973af2a1d516b11113ef002de",
        "action": "<div class='btn-group'><button class='btn btn-info btn-sm' id='btn_action_giveAccess'>Дать доступ</button><button class='btn btn-primary btn-sm' id='btn_moreInfo'>О враче</button></div>"
    },
    {
        "num": 10,
        "id": 59,
        "initials": "FA E. S.",
        "mail": "",
        "profession": "онколог",
        "city": "Москва",
        "meta": "0x55551",
        "action": "<div class='btn-group'><button class='btn btn-info btn-sm' id='btn_action_giveAccess'>Дать доступ</button><button class='btn btn-primary btn-sm' id='btn_moreInfo'>О враче</button></div>"
    },
    {
        "num": 11,
        "id": 66,
        "initials": "Калкин М. П.",
        "mail": "Pik@mail.ru",
        "profession": "терапевт",
        "city": "Москва",
        "meta": "0x60ce5c24198b7e1e3945071153a38e2ea1bc60a9",
        "action": "<div class='btn-group'><button class='btn btn-info btn-sm' id='btn_action_giveAccess'>Дать доступ</button><button class='btn btn-primary btn-sm' id='btn_moreInfo'>О враче</button></div>"
    },
    {
        "num": 12,
        "id": 68,
        "initials": "Стью В. ",
        "mail": "docmai78l@mail.ru",
        "profession": "гинеколог",
        "city": "Москва",
        "meta": "0xc7fd17050f515225a8b88ee9502da11614129d4a",
        "action": "<div class='btn-group'><button class='btn btn-info btn-sm' id='btn_action_giveAccess'>Дать доступ</button><button class='btn btn-primary btn-sm' id='btn_moreInfo'>О враче</button></div>"
    }
];
export async function getTableAllDoctors(tableDoctorRef, user, dispatch)
{
    const city = 'Москва';
    return new DataTables(tableDoctorRef.current,
        {
            responsive: true,
            data: prepare_data,
            columns: [
                { data: "num" },
                { data: 'initials' },
                { data: 'mail' },
                { data: 'profession' },
                { data: 'city' },
                { data: 'action' },
                { data: 'id' },
                { data: 'meta' }
            ],

            searchPanes:
            {
                cascadePanes: true,
                dtOpts:
                {
                    info: true
                },
                viewCount: true,
                collapse: true,
                initCollapsed: true,
                layout: 'columns-3',
                preSelect: [
                    {
                        column: 4,
                        rows: [city]
                    }
                ]
            },
            dom: 'Plfrtip',
            columnDefs: [
                {
                    sClass: css.hide_columns,
                    aTargets: [6, 7]
                },
                {
                    searchPanes:
                    {
                        show: true
                    },
                    targets: [3, 4]
                },
                {
                    searchPanes:
                    {
                        show: false
                    },
                    targets: [1, 2]
                },
                {
                    searchPanes: {
                        show: true,
                        options: [
                            {
                                label: 'Не имеет доступ',
                                value: function (rowData, rowIdx) 
                                {
                                    return rowData.action.includes('Дать доступ');
                                }
                            },
                            {
                                label: 'Имеет доступ',
                                value: function (rowData, rowIdx) 
                                {
                                    return rowData.action.includes('Забрать доступ');
                                }
                            }
                        ]
                        // className: 'bord'
                    },
                    targets: [5]
                }

            ],

            scrollY: 300,
            scrollX: false,
            deferRender: true,
            scroller: true


        });

}
