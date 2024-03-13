/* eslint-disable no-undef */
// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import css from './profile.module.css';
import Accordion from 'react-bootstrap/Accordion';


import { getTableAllDoctors, getTableAllIlls } from "./utils";

import MyTable from "../../components/UI/Tables/MyTable";
import { openTab } from "../total_utlls";

const Profile = () =>
{
  const tableDoctorsRef = useRef();
  const tableIllsRef = useRef();

  const [dt_doctors, setDT_doctors] = useState();
  const [dt_ills, setDT_ills] = useState();
  const [isOpenDoctors, setOpenDoctors] = useState(false);
  const [isOpenIlls, setOpenIlls] = useState(false);


  return (
    <main className={ css.main }>
      <section id="dataset" className={ `${ css.dataset } mt-3` }>
        <Accordion >
          <Accordion.Item eventKey="0">
            <Accordion.Header
              onClick={ e =>
              {
                openTab(isOpenDoctors, getTableAllDoctors,
                  {
                    dtRef: tableDoctorsRef,
                    setDT: setDT_doctors,
                    setOpenTab: setOpenDoctors,
                    dt: dt_doctors
                  },
                  null,
                  null);
              } }>
              Список врачей
            </Accordion.Header>
            <Accordion.Body>
              <MyTable
                tableRef={ tableDoctorsRef }
                idTableBody={ 'table_doctors_tbody' }
                ths={ [
                  { name: '#', classname: '' },
                  { name: 'Инициалы', classname: '' },
                  { name: 'Почта', classname: '' },
                  { name: 'Профессия', classname: '' },
                  { name: 'Город', classname: '' },
                  { name: 'Действия', classname: '' },
                  { name: 'Id', classname: css.hide_columns },
                  { name: 'meta', classname: css.hide_columns }
                ] }
              ></MyTable>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header
              onClick={ e =>
              {
                openTab(isOpenIlls, getTableAllIlls,
                  {
                    dtRef: tableIllsRef,
                    setDT: setDT_ills,
                    setOpenTab: setOpenIlls,
                    dt: dt_ills
                  },
                  null,
                  null);


              } }>
              Список болезней
            </Accordion.Header>
            <Accordion.Body>
              <MyTable
                tableRef={ tableIllsRef }
                idTableBody={ '' }
                ths={ [
                  { name: '#', classname: '' },
                  { name: 'Название', classname: '' },
                  { name: 'Лечение', classname: '' },
                  { name: 'Классификация', classname: '' },
                  { name: 'Дата начала лечения', classname: '' },
                  { name: 'Дата окончания лечения', classname: '' },
                  { name: 'Статус', classname: '' },
                  { name: 'Больше информации', classname: '' },
                  { name: 'id', classname: css.hide_columns }
                ] }
              ></MyTable>

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>
    </main>
  )
}

export default Profile;