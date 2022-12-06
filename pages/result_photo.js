import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormControl,
  Image,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function ResultPhoto() {
  const router = useRouter();
  const [myFoto, setMyFoto] = useState("");
  const [fileImage, setFileImage] = useState(null);
  const toast = useToast();

  useEffect(() => {
    setMyFoto(localStorage.getItem('myPhoto'));
    urltoFile(localStorage.getItem('myPhoto'),  "myPhotos.jpeg", "image/jpeg").then(
      function (file) {
        setFileImage(file);
      }
    );
  }, [myFoto]);


  //convert from base64 format to image file
  function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  function reSelfie(){
    router.push({
        pathname: "/"
    });
  }
  
  //css
  const imageResult = {
    "border-radius": "50%",
    "object-fit": "cover"
  };

  return (
    <Box bgImage={{ base: 'none', md: '/112.png', lg: '/112.png' }} bgPosition="center" bgSize='cover' h='100vh'>
      <Center>
        <Box maxW='sm' 
          mt={{ base: '0px', md: '10px', lg: '10px' }} 
          height={{ base: '100%', md: '50%', lg: '25%'}}
          width={{ base: '600px', md: '50%', lg: '25%', }} 
          borderWidth={{base: '0px', md: '1px', lg: '1px'}}
          bg='teal.400'
          justifyContent="center" 
          overflow='hidden' 
          borderRadius='lg' 
          rounded={24}>         
          <Flex direction="column" background="white" p={5}>
            <Box>
              <Box h="80px">
                <Center>
                  {/* <img src="" width="80px" height="80px" alt="Logo" /> */}
                </Center>
              </Box>
              <Box mt={10}>
                <Center>
                  <Image
                    borderRadius="full"
                    boxSize="200px"
                    objectPosition="-20% 20%"
                    src={myFoto.replace("data:image/jpeg;base64,:", "")}
                    objectFit={"cover"}
                  />
                </Center>
              </Box>
              <FormControl mt={6}>
                <Stack>
                  <Text align={"center"} fontSize='2xl' color={"#black"} as='b'>Check your selfies photos.</Text>
                </Stack>
              </FormControl>
              <FormControl mt={4}>
                <Stack spacing={0}>
                  <Text align={"center"} fontSize='sm' color={"#707070"}>Make sure your photos are not blurry,</Text>
                  <Text align={"center"} fontSize='sm' color={"#707070"}>enough light and not wearing a mask.</Text>
                 </Stack>
              </FormControl>
              <FormControl mt={6} >
                <Center>
                    <Button colorScheme="blue" width="60%" variant="outline" rounded={10} onClick={reSelfie}>
                        Take Re-Selfie
                    </Button>
                </Center>
              </FormControl>
              <FormControl mt={6} >
                <Center>
                    <Button bg="#FD541E" width="60%" rounded={10} colorScheme="orange" onClick="">
                        Save Photo
                    </Button>
                </Center>
              </FormControl>
            </Box>
          </Flex>
        </Box>
      </Center>
    </Box>
  );
}
