import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
    Center,
    Switch,
    Button,
    AspectRatio
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import { GoGear } from "react-icons/go";
  import { FiMonitor } from "react-icons/fi";
  import { useReactMediaRecorder } from "react-media-recorder";

  import { AiOutlineCloseCircle } from "react-icons/ai";
import AppStreamCam from './camera';
export default function Home(){
  const [isSwitchToggled, setIsSwitchToggled] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const stopCamVideo = () => {
    const video = document.querySelector("#videoElement");
    const mediaStream = video.srcObject;

    if(mediaStream) {
      const tracks = mediaStream.getTracks();

      tracks.forEach(track => {
        track.stop();
      });

      video.srcObject = null;
      setIsStreaming(false); // Set isStreaming to false when streaming stops
    }
  };
  const downloadRecording = () => {
    const blob = new Blob([mediaBlobUrl], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded-video.mp4';
    a.click();
  };
  const streamCamVideo = () => {
    const constraints = { audio: true, video: { width: 1280, height: 720 } };
    navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream) => {
        const video = document.querySelector("#videoElement");
        video.srcObject = mediaStream;
        video.onloadedmetadata = (e) => {
          video.play();
          setIsStreaming(true); // Set isStreaming to true when streaming starts
        };
      })
      .catch((err) => {
        console.log(`${err.name}: ${err.message}`);
      });
  };
  const { status, startRecording, stopRecording, mediaBlobUrl } =
  useReactMediaRecorder({ screen: true });


  const handleSwitchToggle = () => {
    setIsSwitchToggled(!isSwitchToggled);
  };

  const handleStartRecording = () => {
    if (isSwitchToggled) {
      streamCamVideo();
    }
    startRecording();
  };

    return(
      
        <Box
        position={'relative'}
        bg={'#ffffff'}
        borderRadius={'24px'}
     
        textAlign="center" minW={'300px'} h={'auto'} p={'5'}>
    <Box w={'full'} justifyContent={'space-between'} display={'flex'} h={'28px'}>
<Box h={'full'} w={'132px'} display={'flex'} alignItems={'center'}>
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <g clip-path="url(#clip0_502_2163)">
    <path d="M21.7983 11.7894C21.4065 10.4385 20.6937 9.20245 19.7207 8.18669C18.7477 7.17092 17.5434 6.40563 16.2106 5.95612C14.8938 5.57283 13.5097 5.47865 12.1532 5.68001C10.7966 5.88138 9.49958 6.37354 8.35091 7.12278C8.25639 7.2175 8.13787 7.28469 8.00805 7.31714C7.87824 7.3496 7.74204 7.34609 7.61407 7.30699C7.35607 7.22341 7.12362 7.07549 6.93863 6.87717C6.80397 6.63419 6.76042 6.35114 6.81582 6.07892C6.85101 5.94826 6.9128 5.82628 6.99733 5.72062C7.08186 5.61495 7.1873 5.52789 7.30705 5.46489C10.5614 3.56138 13.7544 3.07015 16.8246 4.05261C18.3361 4.55536 19.7161 5.38974 20.8635 6.49466C22.0109 7.59959 22.8968 8.9471 23.4562 10.4386H27.5702C26.729 7.12031 24.7011 4.22526 21.8701 2.30077C19.039 0.376283 15.601 -0.444251 12.206 -0.00569532C8.81093 0.43286 5.69423 2.10011 3.44514 4.68083C1.19605 7.26155 -0.0295595 10.5769 3.54369e-05 14C3.54369e-05 14.5526 0.0614389 15.0438 0.0614389 15.5965H5.28074C5.48007 15.5852 5.67768 15.6389 5.8438 15.7497C6.00992 15.8604 6.13556 16.0222 6.20179 16.2105C6.60284 17.5568 7.31887 18.7881 8.29059 19.8025C9.2623 20.817 10.4617 21.5853 11.7895 22.0438C13.1063 22.4271 14.4903 22.5213 15.8469 22.3199C17.2035 22.1186 18.5005 21.6264 19.6492 20.8772C19.7437 20.7825 19.8622 20.7153 19.992 20.6828C20.1218 20.6504 20.258 20.6539 20.386 20.693C20.644 20.7765 20.8765 20.9245 21.0614 21.1228C21.1961 21.3658 21.2397 21.6488 21.1842 21.921C21.1491 22.0517 21.0873 22.1737 21.0027 22.2793C20.9182 22.385 20.8128 22.4721 20.693 22.5351C18.8421 23.7805 16.6608 24.4434 14.4299 24.4386C13.3272 24.4303 12.2314 24.2649 11.1755 23.9473C9.65762 23.4566 8.27154 22.6264 7.12247 21.5199C5.9734 20.4134 5.09156 19.0596 4.5439 17.5614H0.491263C1.37895 20.8251 3.41814 23.6571 6.23189 25.5339C9.04565 27.4107 12.4437 28.2054 15.798 27.7712C19.1523 27.3369 22.2359 25.703 24.4789 23.1715C26.722 20.64 27.9727 17.3821 28 14C28.0115 13.4875 27.991 12.9748 27.9386 12.4649H22.7807C22.5714 12.4511 22.3696 12.381 22.1967 12.2621C22.0238 12.1433 21.8862 11.98 21.7983 11.7894Z" fill="#100A42"/>
    <path d="M14.0594 20.1247C15.2682 20.1131 16.4466 19.744 17.4461 19.064C18.4455 18.3839 19.2214 17.4233 19.676 16.3031C20.1305 15.183 20.2435 13.9533 20.0005 12.7691C19.7576 11.5849 19.1696 10.499 18.3107 9.6483C17.4518 8.79759 16.3604 8.22006 15.1739 7.98846C13.9874 7.75686 12.7589 7.88154 11.6432 8.34681C10.5274 8.81208 9.57424 9.59712 8.90379 10.6031C8.23333 11.609 7.87554 12.7908 7.87549 13.9997C7.87545 14.809 8.03581 15.6104 8.3473 16.3573C8.65878 17.1043 9.11522 17.7822 9.69023 18.3517C10.2652 18.9212 10.9474 19.3712 11.6974 19.6755C12.4473 19.9798 13.2501 20.1325 14.0594 20.1247Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_502_2163">
      <rect width="28" height="28" fill="white"/>
    </clipPath>
  </defs>
</svg>

<Text
ml={'10px'}
fontSize={'16px'}
fontWeight={'700'}
color={'#120B48'}
>
HelpMeOut
</Text>
</Box>
<Box
 h={'full'} display={'flex'} alignItems={'center'}
>
    <GoGear/>
    <AiOutlineCloseCircle/>
</Box>
    </Box>
    <Box
    w={'full'}
    h={'auto'}
    >
<Text

fontSize={'14px'}
text align={'left'}
fontWeight={'400'}
color={'#413C6D'}
pt={'16px'}
>
This extension helps you record and share help videos with ease.
</Text>
<Box
pt={'32px'}
w={'full'}
h={'auto'}
px={'32px'}
display={'flex'}
justifyContent={'space-between'}
>
<Box
w={'76px'}
h={'auto'}

>
<Center
w={'auto'}
h={'auto'}
color={'#928FAB'}

>
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5865 2.66675H23.3998C28.1465 2.66675 29.3332 3.85341 29.3332 8.58675V17.0267C29.3332 21.7734 28.1465 22.9467 23.4132 22.9467H8.5865C3.85317 22.9601 2.6665 21.7734 2.6665 17.0401V8.58675C2.6665 3.85341 3.85317 2.66675 8.5865 2.66675Z" stroke="#928FAB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 22.96V29.3333" stroke="#928FAB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.6665 17.3333H29.3332" stroke="#928FAB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 29.3333H22" stroke="#928FAB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


</Center>

<Text

fontSize={'14px'}

fontWeight={'400'}
color={'#413C6D'}
pt={'8px'}
>
Full screen
</Text>
</Box>
<Box
w={'auto'}
h={'auto'}

>
    <Center>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.3332 17.2001V22.8001C21.3332 27.4667 19.4665 29.3334 14.7998 29.3334H9.19984C4.53317 29.3334 2.6665 27.4667 2.6665 22.8001V17.2001C2.6665 12.5334 4.53317 10.6667 9.19984 10.6667H14.7998C19.4665 10.6667 21.3332 12.5334 21.3332 17.2001Z" stroke="#120B48" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M29.3332 9.20008V14.8001C29.3332 19.4667 27.4665 21.3334 22.7998 21.3334H21.3332V17.2001C21.3332 12.5334 19.4665 10.6667 14.7998 10.6667H10.6665V9.20008C10.6665 4.53341 12.5332 2.66675 17.1998 2.66675H22.7998C27.4665 2.66675 29.3332 4.53341 29.3332 9.20008Z" stroke="#120B48" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    </Center>
    <Text

fontSize={'14px'}

fontWeight={'400'}
color={'#120B48'}
pt={'8px'}
>
Current Tab
</Text>


</Box>


</Box>
<Box
mt={'24px'}
w={'full'}
h={'46px'}
display={'flex'}
alignItems={'center'}
colorScheme={'black'}
borderRadius={'var(--Inner-Radius, 12px)'}
border={'1px solid var(--primary-primary-600, #100A42)'}
px={'16px'}
>
    <Box
    alignItems={'center'}
    w={'full'}
    display={'flex'}
    >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M15.75 10.5L20.4697 5.78033C20.9421 5.30786 21.75 5.64248 21.75 6.31066V17.6893C21.75 18.3575 20.9421 18.6921 20.4697 18.2197L15.75 13.5M4.5 18.75H13.5C14.7426 18.75 15.75 17.7426 15.75 16.5V7.5C15.75 6.25736 14.7426 5.25 13.5 5.25H4.5C3.25736 5.25 2.25 6.25736 2.25 7.5V16.5C2.25 17.7426 3.25736 18.75 4.5 18.75Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<Text

ml={'10px'}
fontSize={'14px'}

fontWeight={'500'}
color={'#120B48'}

>
Camera
</Text>
    </Box>
<Switch
onChange={handleSwitchToggle} isChecked={isSwitchToggled}
 size='md' />
</Box>
<Box
mt={'24px'}
w={'full'}
h={'46px'}
display={'flex'}
alignItems={'center'}
colorScheme={'black'}
borderRadius={'var(--Inner-Radius, 12px)'}
border={'1px solid var(--primary-primary-600, #100A42)'}
px={'16px'}
>
    <Box
    alignItems={'center'}
    w={'full'}
    display={'flex'}
    >
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 18.75C15.3137 18.75 18 16.0637 18 12.75V11.25M12 18.75C8.68629 18.75 6 16.0637 6 12.75V11.25M12 18.75V22.5M8.25 22.5H15.75M12 15.75C10.3431 15.75 9 14.4069 9 12.75V4.5C9 2.84315 10.3431 1.5 12 1.5C13.6569 1.5 15 2.84315 15 4.5V12.75C15 14.4069 13.6569 15.75 12 15.75Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<Text

ml={'10px'}
fontSize={'14px'}

fontWeight={'500'}
color={'#120B48'}

>
Audio
</Text>
    </Box>
<Switch size='md' />
</Box>


        <div>

        {!isStreaming &&
        <Button   mt={'24px'}
        borderRadius={'var(--Inner-Radius, 12px)'}
        bg={'var(--primary-main, #120B48)'}
        h={'51px'}
        w={'full'}
        color={'white'} 
        onClick={() => {
          streamCamVideo();
          startRecording();
          }}
        
        >Start Recording</Button>}
       
       {isStreaming &&  <Button
        mt={'24px'}
        borderRadius={'var(--Inner-Radius, 12px)'}
        bg={'var(--primary-main, #120B48)'}
        h={'51px'}
        w={'full'}
        color={'white'}
        onClick={() => {
          stopRecording();
          stopCamVideo();
          downloadRecording();
          }}
        
        >Stop Recording</Button>
    
        }
    


    <div>
      <p>{status}</p>
    
     
      
    </div>




         
     
        </div>
        <div>
    
      <Box 

      zIndex={'999'}
      position={'absolute'}
      top={'100%'}
      left={'0'}
      ml={'32px'}
  pointerEvents={'none'}
  
     >
        <video 
        width={'350px'}
       muted
       style={{ display: isStreaming ? 'block' : 'none' }}
          autoPlay={true} id="videoElement" controls></video>
        </Box>
    
    
      <br />
   
    </div>
    </Box>
    
      </Box>
        
    )
}