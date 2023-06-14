import React,{useState,useEffect} from 'react';
import {
	Text,
	Image,
	Flex,
  Wrap,
  WrapItem,
  Center,
	Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"
import axios from 'axios';
import { getLogAktuator } from '../../Utility/api_link';
import Loading from "../../component/loading/loading";
import { useNavigate } from "react-router-dom";
import ValueAktuator from '../value_aktuator/value_aktuator';
import moment from 'moment';


const CardLogActuator = (props) => {
		const eleminateZ = (date) => {
			let result = date.replace("T", " ").replace("Z", " +0700");
			return result;
		};
    const idApi = props.data.id
		var idLocale = require("moment/locale/id");
		moment.locale("id", idLocale);
    const navigate = useNavigate();
    const [dataTable, setDataTable] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getPagination = async () => {
      setIsLoading(true)

      const header = localStorage.getItem('token')
      await axios.get(`${getLogAktuator}${idApi}`, {
        headers: {
            'Authorization': 'Bearer ' + header
          }
        })
        .then(response => {
          setDataTable(response.data.data)
          setIsLoading(false)
        })
        .catch((error) => {
            localStorage.clear()
            navigate('/login')
        })
    }
    

    useEffect(() => {
      getPagination()
    },[idApi]);
    return (
        <>
          {dataTable == null || isLoading ? (
          <Loading/> 
          ):(
           <Flex>
                <Flex align={'center'} justify={'center'} mt={'30px'}>
                  <Wrap className='center-ul' align={'center'} spacing={'10px'} mt={'30px'}>
									{
										dataTable.map((item,index) => {
											return(
												<Box key={index} 
												w={['100%']}
												className='card-sensor'
												bg={'#ffff'}
												borderRadius={'10px'}
												border={'1px solid #E2E8F0'}
												padding={'10px'}>
												<Flex alignItems={'center'} justifyContent={'space-between'}>
													<Flex>
														<Wrap padding={'10px'} w={'60px'}>
															<Image className='Image' w={['100%']} h={['100%']}src={item.on_off_status == 0 ? '/off_log.png' : '/on_log.png'} alt="image" />
														</Wrap>
														<Flex direction={'column'} alignItems={'start'} justifyContent={'center'}>
															<Text>Status{item.on_off_status == 1 ?  (<Text width={'100%'} fontWeight={'bold'} color={'var(--color-secondary-variant)'}>Nyala</Text>) : (<Text width={'100%'} fontWeight={'bold'} color={'var(--color-error)'}>Mati</Text>)}</Text>
															<Text>{moment(eleminateZ(item.created_at)).startOf("seconds").fromNow()}</Text>
														</Flex>
													</Flex>
													<Text>{moment(eleminateZ(item.created_at)).format('MMMM Do YYYY, h:mm:ss a')}</Text>
												</Flex>									
												</Box>
											);
										})
									}
                  </Wrap>
                </Flex>
              </Flex>
            )
          }
        </>
    )
}
export default CardLogActuator;