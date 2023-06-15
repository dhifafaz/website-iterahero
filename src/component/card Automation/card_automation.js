import React,{useState,useEffect} from 'react';
import {
	Text,
	Image,
	Flex,
  Wrap,
  Button,
  Icon,
	Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { RiDeleteBinFill, RiPencilFill} from "react-icons/ri";


const CardAutomation = (props) => {
    const item = props.data
    const navigate = useNavigate();

    useEffect(() => {
  
    },[item]);

    console.log(item);

    return (
        <>
          <Box 
          w={['100%']}
          classNameName='card-Automation'
          bg={'#ffff'}
          borderRadius={'10px'}
          border={'1px solid #E2E8F0'}
          padding={'10px'}>
          <Flex alignItems={'center'} justifyContent={'space-between'} w={['100%']} p={'10px'}>
            <Flex alignItems={'center'} justifyContent={'start'}>
              <Wrap p={'10px'}>
                <Image classNameName='Image' w={['100%']} h={['100%']} src={'/automation.png'} alt="image"></Image>
              </Wrap>
              <Flex direction={'column'} alignItems={'start'} justifyContent={'start'}>
                <Flex direction={'row'}>
                  <Text>Acutator :</Text>
                  <Text>{item.actuator.name}</Text>
                </Flex>
                <Flex direction={'row'} alignItems={'start'} justifyContent={'start'}>
                  <Text>Sensor :</Text>
                  <Text>{item.sensor.name}</Text>
                </Flex>
                <Flex direction={'row'} alignItems={'start'} justifyContent={'start'}>
                  <Text>Kondisi :</Text>
                  <Text>{item.between}</Text>
                </Flex>
                <Flex direction={'row'} alignItems={'start'} justifyContent={'start'}>
                  <Text>Status Lifecycle :</Text>
                  {item.status_lifecycle == '1'? <Text color={'var(--color-secondary-variant)'}>on</Text> : <Text color={'var(--color-error)'}>off</Text> }
                </Flex>
                <Flex direction={'row'} alignItems={'start'} justifyContent={'start'}>
                  <Text>constanta :</Text>
                  <Text>{item.constanta}</Text>
                </Flex>
              </Flex>
            </Flex>
              <Flex direction={'row'} alignItems={'start'} justifyContent={'start'}>
                <Flex>
                  <div className="touch">
                    <Icon as={RiDeleteBinFill} size={"24px"} color={"#B00020"} />
                  </div>
                  <Link
                  className="touch"
                    to={{
                      pathname: "/unit/dashboard/aktuator/automation/add",
                    }}>
                    <Icon
                      as={RiPencilFill}
                      size={"24px"}
                      color={"#007BFF"}
                      marginStart={"10px"}
                    />
                  </Link>
                </Flex>
              </Flex>
            </Flex>									
          </Box>
  
      </>
    )
}
export default CardAutomation;