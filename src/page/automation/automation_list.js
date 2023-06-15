import React,{useState,useEffect} from 'react';
import {
	Text,
	Flex,
  Wrap,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"
import axios from 'axios';
import Loading from "../../component/loading/loading";
import { useNavigate } from "react-router-dom";
import { getAutomationByActuator } from '../../Utility/api_link';
import CardAutomation from '../../component/card Automation/card_automation';


const AutomationList = (props) => {
    const idApi = props.data.id
    const navigate = useNavigate();
    const [dataApi, setDataApi] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getAutomation = async () => {
        setIsLoading(true)
  
        const header = localStorage.getItem('token')
        await axios.get(`${getAutomationByActuator}${idApi}`, {
          headers: {
              'Authorization': 'Bearer ' + header
            }
          })
          .then(response => {
            setDataApi(response.data.data);
            setIsLoading(false)
          })
          .catch((error) => {
              localStorage.clear()
              navigate('/login')
          })
      }
      
    useEffect(() => {
        getAutomation();
    },[idApi]);
    return (
        <>
          {dataApi== null || isLoading ? (
          <Loading/> 
          ):(
            <Wrap  w={['100%']} margin={'0px'}>
              <Flex w="100%" flexDir={"column"}>
                <Flex
                  w="100%"
                  flexDir={"row"}
                  justifyContent="space-between"
                  alignItems={"center"}
                  marginBottom="20px">
                  <Text
                    fontWeight={"semibold"}
                    fontSize={"var(--header-3)"}
                    color={"var(--color-primer)"}>
                    List Automation
                  </Text>
      
                  <Link to={"/unit/dashboard/aktuator/automation/add"}>
                    <Button bg="#14453E" size="sm" colorScheme={"teal"}>
                      Tambah
                    </Button>
                  </Link>
                  </Flex>
              </Flex>
                <Flex direction={'column'} w={['100%']} margin={'0px'}>
                  {dataApi.map((data) => (
                    <CardAutomation
                      data={{
                          actuator: data.actuator,
                          sensor: data.sensor,
                          between: data.between,
                          status_lifecycle: data.status_lifecycle,
                          constanta: data.constanta,
                          id_automation: data.id_automation,
                      }}
                    />
                  ))};
                </Flex>
            </Wrap>
            
            )
          }
        </>
    )
}
export default AutomationList;