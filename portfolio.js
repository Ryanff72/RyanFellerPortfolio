//variables n things
let initialX = 0, initialY = 0;
let moveElement = false;
let activeDisk = "";


//i just did this for the first 2 but then got bored or something? Images. idk :3
let backgrounds = ["Images/nyanspace.gif", "Images/static.gif", "Images/code.gif", "Images/hacking.gif", "Images/face.gif", "Images/beachwalk.gif", "Images/mark.gif", "Images/bwface.gif", "Images/workhacking.gif", "Images/road.gif"];
let currentBackground = 0;

//disks n pages
let floppyDrive = document.getElementById("floppy-disk-drive");
let aboutMeCartridge = document.getElementById("aboutme-elem");
let projectsCartridge = document.getElementById("projects-elem");
let contactCartridge = document.getElementById("contact-elem");
let researchCartridge = document.getElementById("research-elem");
let customCartridge = document.getElementById("custom-elem");
let aboutMePage = document.getElementById("about-me");
let projectsPage = document.getElementById("projects");
let contactPage = document.getElementById("contact");
let researchPage = document.getElementById("research");
let customPage = document.getElementById("custom");

//SCROLLBOX yep
const scrollbox = document.querySelector('.scrollbox');
scrollbox.style.backgroundAttachment = "local";



// CARTRIGESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
let events = {
  mouse: {
    down: "mousedown", 
    move: "mousemove", 
    up: "mouseup",
  },
  touch:{
    down: "touchstart",
    move: "touchmove",
    up: "touched",
  },
}

let deviceType = "";

const isTouchDevice = () => {
  try{
    //we try to create touchevent
    document . createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  }
  catch(e){
    deviceType = "mouse";
    return false;
  }
}
isTouchDevice();

//AAAAAAAAAAABBBBBBBBBBBBBOOOOOOUUUUUUUUUUTTTTTTTTMMMMMMEEEEEE
// Start (mouse down / touch start)
aboutMeCartridge.addEventListener(events[deviceType].down, (e) => {
  e.preventDefault();
  aboutMeCartridge.style.width = "17vw";
  aboutMeCartridge.style.height = "17vw";
  aboutMeCartridge.style.paddingLeft = "0px";
  aboutMeCartridge.style.paddingTop = "0px";
  aboutMeCartridge.innerHTML = "";
  aboutMeCartridge.style.backgroundImage = "url(Images/aboutmedisk.PNG)";
  initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
  initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
  aboutMeCartridge.style.zIndex = "50";
  // Start movement
  moveElement = true;
  activeDisk = aboutMeCartridge;
});

aboutMeCartridge.addEventListener(events[deviceType].move, (e) => {
  // If movement is true and the activeDisk is the aboutMeCartridge
  if (moveElement && activeDisk === aboutMeCartridge) {
    e.preventDefault();
    let newX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    let newY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
    let deltaX = initialX - newX;
    let deltaY = initialY - newY;
    let newTop = aboutMeCartridge.offsetTop - deltaY;
    let newLeft = aboutMeCartridge.offsetLeft - deltaX;

    // Adjust newTop and newLeft if they go beyond window boundaries
    const maxX = window.innerWidth - aboutMeCartridge.offsetWidth;
    const maxY = window.innerHeight - aboutMeCartridge.offsetHeight;
    newTop = Math.max(0, Math.min(newTop, maxY));
    newLeft = Math.max(0, Math.min(newLeft, maxX));

    aboutMeCartridge.style.top = newTop + "px";
    aboutMeCartridge.style.left = newLeft + "px";
    initialX = newX;
    initialY = newY;
  }
});

// Mouse up or touch end
window.addEventListener(events[deviceType].up, (e) => {
  moveElement = false;
  activeDisk = null;
  aboutMeCartridge.innerHTML = "About Me";
  aboutMeCartridge.style.backgroundImage = "url(Images/unhelddisk.png)";

  let initialPositionSet = false;
  let initialTopOffset = null;
  // Initial positioning of aboutMeCartridge
  positionAboutMeCartridge();

  // Update position on window size
  window.addEventListener('resize', positionAboutMeCartridge);
});

function positionAboutMeCartridge() {
  const offsetX = 486; // offset x
  const offsetY = 400; // offset y

  //if the disk is put in the drive
  if (isCollide(aboutMeCartridge, floppyDrive)){

    diskOverride();

    //scrollbar
    const scrollboxStyle = document.createElement("style");
    scrollboxStyle.innerHTML = `
    .scrollbox::-webkit-scrollbar {
     width: 25px; /* Adjust the width as needed */
     border-radius: 0.5%;
    }

    .scrollbox::-webkit-scrollbar-track {
      background-image: url("Images/gradient.gif");
      background-size: 40vw;
      background-repeat: repeat;
    }

    .scrollbox::-webkit-scrollbar-thumb {
      border-radius: 0.5%;
      background: rgb(42, 36, 48);
    }

    .scrollbox::-webkit-scrollbar-thumb:hover {
      background: rgb(27, 23, 31);
      background-size: 3%;
      background-repeat: repeat;
      border-radius: 0.2%;
    }
   `;
    document.head.appendChild(scrollboxStyle);
    //endscrollbarstuff
    scrollbox.style.backgroundImage = "url(Images/bcgrnd0.jpg)";
    scrollbox.style.backgroundRepeat = "repeat";
    scrollbox.style.backgroundSize = "30%";
    aboutMePage.style.display = 'block';
    floppyDrive.style.backgroundImage="url(Images/diskdriveON0.png)";
    const floppyDriveRect = floppyDrive.getBoundingClientRect();
    const aboutMeCartridgeRect = aboutMeCartridge.getBoundingClientRect();
    const targetLeft = floppyDriveRect.left + offsetX;
    const targetTop = floppyDriveRect.top + offsetY/2.2;
    const aboutMeCartridgeLeft = targetLeft - window.scrollX - aboutMeCartridgeRect.width / 2;
    const aboutMeCartridgeTop = targetTop - window.scrollY;
    aboutMeCartridge.style.position = 'absolute';
    //aboutMeCartridge.style.left = `${aboutMeCartridgeLeft}px`;
    //aboutMeCartridge.style.top = `${aboutMeCartridgeTop}px`;
    aboutMeCartridge.style.left = "38vw"; 
    aboutMeCartridge.style.top = "42vw";
  }
  else{

    aboutMeCartridge.style.left="1%";
    aboutMeCartridge.style.top="4%";
    aboutMeCartridge.style.zIndex="6";
    aboutMePage.style.display = 'none';
    aboutMeCartridge.style.width="15vw";
    aboutMeCartridge.style.height="3.8vw";
    aboutMeCartridge.style.paddingLeft="3%";
    aboutMeCartridge.style.paddingTop=".6%";
    aboutMeCartridge.style.backgroundImage="url(Images/unhelddisk.png)";
    aboutMeCartridge.innerHTML = "About Me";

    var backgroundImage = scrollbox.style.backgroundImage;
    if (backgroundImage.includes("Images/bcgrnd0.jpg")) {
      scrollbox.style.backgroundImage = "url(Images/nodisk.gif)";
      scrollbox.style.backgroundSize="cover";
      floppyDrive.style.backgroundImage="url(Images/diskdrive0.png)";
    }
    
  }
  aboutMeCartridge.style.width="15vw";
  aboutMeCartridge.style.height="3.8vw";
  aboutMeCartridge.style.paddingLeft="3%";
  aboutMeCartridge.style.paddingTop=".6%";
}


//PPPPPPPPRRRRRRRROOOOOOOOJJJJJJJJEEEEEEEECCCCCCCCTTTTTTTTSSSSSSSS
// Start (mouse down / touch start)
projectsCartridge.addEventListener(events[deviceType].down, (e) => {
  e.preventDefault();
  projectsCartridge.style.width = "17vw";
  projectsCartridge.style.height = "17vw";
  projectsCartridge.style.paddingLeft = "0px";
  projectsCartridge.style.paddingTop = "0px";
  projectsCartridge.innerHTML = "";
  projectsCartridge.style.backgroundImage = "url(Images/projectsdisk.PNG)";
  initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
  initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
  projectsCartridge.style.zIndex = "50";
  // Start movement
  moveElement = true;
  
  activeDisk = projectsCartridge;
});

projectsCartridge.addEventListener(events[deviceType].move, (e) => {
  // If movement is true, then set top and left to new x and y while removing the offset
  if (moveElement && projectsCartridge === activeDisk) {
    e.preventDefault();
    let newX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    let newY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
    let deltaX = initialX - newX;
    let deltaY = initialY - newY;
    let newTop = projectsCartridge.offsetTop - deltaY;
    let newLeft = projectsCartridge.offsetLeft - deltaX;
    
    // Adjust newTop and newLeft if they go beyond window boundaries
    const maxX = window.innerWidth - projectsCartridge.offsetWidth;
    const maxY = window.innerHeight - projectsCartridge.offsetHeight;
    newTop = Math.max(0, Math.min(newTop, maxY));
    newLeft = Math.max(0, Math.min(newLeft, maxX));

    projectsCartridge.style.top = newTop + "px";
    projectsCartridge.style.left = newLeft + "px";
    initialX = newX;
    initialY = newY;
  }
});

// Mouse up or touch end
projectsCartridge.addEventListener(events[deviceType].up, (stopMovement = (e) => { moveElement = false; }));

projectsCartridge.addEventListener("mouseleave", (e) => {
  if (moveElement && projectsCartridge === activeDisk) {
    projectsCartridge.style.left = e.clientX + 'px';
    projectsCartridge.style.top = e.clientY + 'px';
  }
});

projectsCartridge.addEventListener(events[deviceType].up, (e) => {
  moveElement = false;
  projectsCartridge.innerHTML = "projects";
  projectsCartridge.style.backgroundImage = "url(Images/unhelddisk.png)";

  let initialPositionSet = false;
  let initialTopOffset = null;
  // Initial positioning of projectscartridge
  positionprojectsCartridge();

  // Update position on window resize
  window.addEventListener('resize', positionprojectsCartridge);
});

function positionprojectsCartridge() {
  const offsetX = 486; // offset x
  const offsetY = 400; // offset y

  //if the disk is put in the drive
  if (isCollide(projectsCartridge, floppyDrive) && projectsPage.style.display != 'block') {
    diskOverride();

    //scrollbar
    const scrollboxStyle = document.createElement("style");
    scrollboxStyle.innerHTML = `
    .scrollbox::-webkit-scrollbar {
     width: 25px; /* Adjust the width as needed */
     border-radius: 0.5%;
    }

    .scrollbox::-webkit-scrollbar-track {
      background-image: url("Images/gradient.gif");
      background-size: 40vw;
      background-repeat: repeat;
    }

    .scrollbox::-webkit-scrollbar-thumb {
      border-radius: 0.5%;
      background-image: url("Images/steel.jpg");
      background-size: 60vw;
      background-repeat: repeat;
    }

   .scrollbox::-webkit-scrollbar-thumb:hover {
    background-image: url("Images/blacksteen.jpg");
      background-size: 60vw;
      background-repeat: repeat;
     border-radius: 0.2%;
    }
    `;
    document.head.appendChild(scrollboxStyle);
    //endscrollbarstuff
    scrollbox.style.backgroundImage = "url(Images/floralbackground.jpg)";
    scrollbox.style.backgroundRepeat = "repeat";
    scrollbox.style.backgroundSize = "40%";
    projectsPage.style.display = 'block';
    floppyDrive.style.backgroundImage="url(Images/diskdriveON0.png)";
    const floppyDriveRect = floppyDrive.getBoundingClientRect();
    const projectsCartridgeRect = projectsCartridge.getBoundingClientRect();
    const targetLeft = floppyDriveRect.left + offsetX;
    const targetTop = floppyDriveRect.top + offsetY/2.2;
    const projectsCartridgeLeft = targetLeft - window.scrollX - projectsCartridgeRect.width / 2;
    const projectsCartridgeTop = targetTop - window.scrollY;
    projectsCartridge.style.position = 'absolute';
    //projectsCartridge.style.left = `${projectsCartridgeLeft}px`;
    //projectsCartridge.style.top = `${projectsCartridgeTop}px`;
    projectsCartridge.style.left = "38vw"; 
    projectsCartridge.style.top = "42vw";
  }
  else{

    projectsCartridge.style.left="1%";
    projectsCartridge.style.top="15%";
    projectsCartridge.style.zIndex="6";
    projectsPage.style.display = 'none';
    projectsCartridge.style.width="15vw";
    projectsCartridge.style.height="3.8vw";
    projectsCartridge.style.paddingLeft="3%";
    projectsCartridge.style.paddingTop=".6%";
    projectsCartridge.style.backgroundImage="url(Images/unhelddisk.png)";
    projectsCartridge.innerHTML = "Projects";

    var backgroundImage = scrollbox.style.backgroundImage;
    if (backgroundImage.includes("Images/floralbackground.jpg")) {
      scrollbox.style.backgroundImage = "url(Images/nodisk.gif)";
      scrollbox.style.backgroundSize="cover";
      floppyDrive.style.backgroundImage="url(Images/diskdrive0.png)";
    }
    
  }
  projectsCartridge.style.width="15vw";
  projectsCartridge.style.height="3.8vw";
  projectsCartridge.style.paddingLeft="3%";
  projectsCartridge.style.paddingTop=".6%";
}


//COOOOOOOOOONNNNNNNNNNNNNNTTTTTTTTTTAAAAAAAACCCCCCCCCCCCCTTTTTTTTTTTT!!!
// Start (mouse down / touch start)
contactCartridge.addEventListener(events[deviceType].down, (e) => {
  e.preventDefault();
  contactCartridge.style.width = "17vw";
  contactCartridge.style.height = "17vw";
  contactCartridge.style.paddingLeft = "0px";
  contactCartridge.style.paddingTop = "0px";
  contactCartridge.innerHTML = "";
  contactCartridge.style.backgroundImage = "url(Images/contactdisk.png)";
  initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
  initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
  contactCartridge.style.zIndex = "50";
  // Start movement
  moveElement = true;

  activeDisk = contactCartridge;
});

contactCartridge.addEventListener(events[deviceType].move, (e) => {
  // If movement is true, then set top and left to new x and y while removing the offset
  if (moveElement && activeDisk === contactCartridge) {
    e.preventDefault();
    let newX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    let newY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
    let deltaX = initialX - newX;
    let deltaY = initialY - newY;
    let newTop = contactCartridge.offsetTop - deltaY;
    let newLeft = contactCartridge.offsetLeft - deltaX;
    
    // Adjust newTop and newLeft if they go beyond window boundaries
    const maxX = window.innerWidth - contactCartridge.offsetWidth;
    const maxY = window.innerHeight - contactCartridge.offsetHeight;
    newTop = Math.max(0, Math.min(newTop, maxY));
    newLeft = Math.max(0, Math.min(newLeft, maxX));

    contactCartridge.style.top = newTop + "px";
    contactCartridge.style.left = newLeft + "px";
    initialX = newX;
    initialY = newY;
  }
});

// Mouse up or touch end
contactCartridge.addEventListener(events[deviceType].up, (stopMovement = (e) => { moveElement = false; }));

contactCartridge.addEventListener("mouseleave", (e) => {
  if (moveElement && activeDisk === contactCartridge) {
    contactCartridge.style.left = e.clientX + 'px';
    contactCartridge.style.top = e.clientY + 'px';
  }
});

contactCartridge.addEventListener(events[deviceType].up, (e) => {
  moveElement = false;
  contactCartridge.innerHTML = "Contact";
  contactCartridge.style.backgroundImage = "url(Images/unhelddisk.png)";

  let initialPositionSet = false;
  let initialTopOffset = null;
  // Initial positioning of contactcartridge
  positioncontactCartridge();

  // Update position on window resize
  window.addEventListener('resize', positioncontactCartridge);
});

function positioncontactCartridge() {
  const offsetX = 486; // offset x
  const offsetY = 400; // offset y

  //if the disk is put in the drive
  if (isCollide(contactCartridge, floppyDrive) && contactPage.style.display != 'block') {
    diskOverride();

    //scrollbar
    const scrollboxStyle = document.createElement("style");
    scrollboxStyle.innerHTML = `
    .scrollbox::-webkit-scrollbar {
     width: 25px; /* Adjust the width as needed */
     border-radius: 0.5%;
    }

    .scrollbox::-webkit-scrollbar-track {
      background-image: url("Images/greypaper.jpg");
      background-size: 40vw;
      background-repeat: repeat;
    }

    .scrollbox::-webkit-scrollbar-thumb {
      border-radius: 0.5%;
      background-image: url("Images/blackpaper.jpg");
      background-size: 5vw;
      background-repeat: repeat;
    }

   .scrollbox::-webkit-scrollbar-thumb:hover {
      background: rgb(27, 23, 31);
      background-size: 3%;
      background-repeat: repeat;
     border-radius: 0.2%;
    }
    `;
    document.head.appendChild(scrollboxStyle);
    //endscrollbarstuff
    scrollbox.style.backgroundImage = "url(Images/paperbackground.png)";
    scrollbox.style.backgroundRepeat = "repeat";
    scrollbox.style.backgroundSize = "40%";
    contactPage.style.display = 'block';
    floppyDrive.style.backgroundImage="url(Images/diskdriveON0.png)";
    const floppyDriveRect = floppyDrive.getBoundingClientRect();
    const contactCartridgeRect = contactCartridge.getBoundingClientRect();
    const targetLeft = floppyDriveRect.left + offsetX;
    const targetTop = floppyDriveRect.top + offsetY/2.2;
    const contactCartridgeLeft = targetLeft - window.scrollX - contactCartridgeRect.width / 2;
    const contactCartridgeTop = targetTop - window.scrollY;
    contactCartridge.style.position = 'absolute';
    //contactCartridge.style.left = `${contactCartridgeLeft}px`;
    //contactCartridge.style.top = `${contactCartridgeTop}px`;
    contactCartridge.style.left = "38vw"; 
    contactCartridge.style.top = "42vw";
  }
  else{

    contactCartridge.style.left="1%";
    contactCartridge.style.top="37%";
    contactCartridge.style.zIndex="6";
    contactPage.style.display = 'none';
    contactCartridge.style.width="15vw";
    contactCartridge.style.height="3.8vw";
    contactCartridge.style.paddingLeft="3%";
    contactCartridge.style.paddingTop=".6%";
    contactCartridge.style.backgroundImage="url(Images/unhelddisk.png)";
    contactCartridge.innerHTML = "Contact";
    
    var backgroundImage = scrollbox.style.backgroundImage;
    if (backgroundImage.includes("Images/paperbackground.png")) {
      scrollbox.style.backgroundImage = "url(Images/nodisk.gif)";
      scrollbox.style.backgroundSize="cover";
      floppyDrive.style.backgroundImage="url(Images/diskdrive0.png)";
    }
    
  }
  contactCartridge.style.width="15vw";
  contactCartridge.style.height="3.8vw";
  contactCartridge.style.paddingLeft="3%";
  contactCartridge.style.paddingTop=".6%";
}

//RRRREEEESSSSEEEEAAAAAAAAAAAAAAAAAAARRRRRRRRRRRRRRRRRRRRCCCCCCCHHHHHH!!!
// Start (mouse down / touch start)
researchCartridge.addEventListener(events[deviceType].down, (e) => {
  e.preventDefault();
  researchCartridge.style.width = "17vw";
  researchCartridge.style.height = "17vw";
  researchCartridge.style.paddingLeft = "0px";
  researchCartridge.style.paddingTop = "0px";
  researchCartridge.innerHTML = "";
  researchCartridge.style.backgroundImage = "url(Images/researchdisk.png)";
  initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
  initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
  researchCartridge.style.zIndex = "50";
  // Start movement
  moveElement = true;
  
  activeDisk = researchCartridge;
});

researchCartridge.addEventListener(events[deviceType].move, (e) => {
  // If movement is true, then set top and left to new x and y while removing the offset
  if (moveElement && researchCartridge === activeDisk) {
    e.preventDefault();
    let newX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    let newY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
    let deltaX = initialX - newX;
    let deltaY = initialY - newY;
    let newTop = researchCartridge.offsetTop - deltaY;
    let newLeft = researchCartridge.offsetLeft - deltaX;
    
    // Adjust newTop and newLeft if they go beyond window boundaries
    const maxX = window.innerWidth - researchCartridge.offsetWidth;
    const maxY = window.innerHeight - researchCartridge.offsetHeight;
    newTop = Math.max(0, Math.min(newTop, maxY));
    newLeft = Math.max(0, Math.min(newLeft, maxX));

    researchCartridge.style.top = newTop + "px";
    researchCartridge.style.left = newLeft + "px";
    initialX = newX;
    initialY = newY;
  }
});

// Mouse up or touch end
researchCartridge.addEventListener(events[deviceType].up, (stopMovement = (e) => { moveElement = false; }));

researchCartridge.addEventListener("mouseleave", (e) => {
  if (moveElement && researchCartridge === activeDisk) {
    researchCartridge.style.left = e.clientX + 'px';
    researchCartridge.style.top = e.clientY + 'px';
  }
});

researchCartridge.addEventListener(events[deviceType].up, (e) => {
  moveElement = false;
  researchCartridge.innerHTML = "Research";
  researchCartridge.style.backgroundImage = "url(Images/unhelddisk.png)";

  let initialPositionSet = false;
  let initialTopOffset = null;
  // Initial positioning of researchcartridge
  positionresearchCartridge();

  // Update position on window resize
  window.addEventListener('resize', positionresearchCartridge);
});

function positionresearchCartridge() {
  const offsetX = 486; // offset x
  const offsetY = 400; // offset y

  //if the disk is put in the drive
  if (isCollide(researchCartridge, floppyDrive) && researchPage.style.display != 'block') {
    diskOverride();

    //scrollbar
    const scrollboxStyle = document.createElement("style");
    scrollboxStyle.innerHTML = `
    .scrollbox::-webkit-scrollbar {
     width: 25px; /* Adjust the width as needed */
     border-radius: 0.5%;
    }

    .scrollbox::-webkit-scrollbar-track {
      background: rgb(255, 234, 229);
      background-size: 40vw;
      background-repeat: repeat;
    }

    .scrollbox::-webkit-scrollbar-thumb {
      border-radius: 0.5%;
      background-image: url("Images/steel.jpg");
      background-size: 60vw;
      background-repeat: repeat;
    }

   .scrollbox::-webkit-scrollbar-thumb:hover {
    background-image: url("Images/blacksteen.jpg");
      background-size: 60vw;
      background-repeat: repeat;
     border-radius: 0.2%;
    }
    `;
    document.head.appendChild(scrollboxStyle);
    //endscrollbarstuff
    scrollbox.style.backgroundImage = "url(Images/whitebackground.jpg)";
    scrollbox.style.backgroundRepeat = "repeat";
    scrollbox.style.backgroundSize = "40%";
    researchPage.style.display = 'block';
    floppyDrive.style.backgroundImage="url(Images/diskdriveON0.png)";
    const floppyDriveRect = floppyDrive.getBoundingClientRect();
    const researchCartridgeRect = researchCartridge.getBoundingClientRect();
    const targetLeft = floppyDriveRect.left + offsetX;
    const targetTop = floppyDriveRect.top + offsetY/2.2;
    const researchCartridgeLeft = targetLeft - window.scrollX - researchCartridgeRect.width / 2;
    const researchCartridgeTop = targetTop - window.scrollY;
    researchCartridge.style.position = 'absolute';
    //researchCartridge.style.left = `${researchCartridgeLeft}px`;
    //researchCartridge.style.top = `${researchCartridgeTop}px`;
    researchCartridge.style.left = "38vw"; 
    researchCartridge.style.top = "42vw";
  }
  else{

    researchCartridge.style.left="1%";
    researchCartridge.style.top="26%";
    researchCartridge.style.zIndex="6";
    researchPage.style.display = 'none';
    researchCartridge.style.width="15vw";
    researchCartridge.style.height="3.8vw";
    researchCartridge.style.paddingLeft="3%";
    researchCartridge.style.paddingTop=".6%";
    researchCartridge.style.backgroundImage="url(Images/unhelddisk.png)";
    researchCartridge.innerHTML = "Research";

    var backgroundImage = scrollbox.style.backgroundImage;
    if (backgroundImage.includes("Images/whitebackground.jpg")) {
      scrollbox.style.backgroundImage = "url(Images/nodisk.gif)";
      scrollbox.style.backgroundSize="cover";
      floppyDrive.style.backgroundImage="url(Images/diskdrive0.png)";
    }
    
  }
  researchCartridge.style.width="15vw";
  researchCartridge.style.height="3.8vw";
  researchCartridge.style.paddingLeft="3%";
  researchCartridge.style.paddingTop=".6%";
}


//CCCCCCCCCCUUUUUUUUUUSSSSSSSSSTTTTTTTTTTOOOOOOOOOMMMMMIIIIIIIIZZZZZZAAAAAAAATTTTTTTION!!
// Start (mouse down / touch start)
customCartridge.addEventListener(events[deviceType].down, (e) => {
  e.preventDefault();
  customCartridge.style.width = "17vw";
  customCartridge.style.height = "17vw";
  customCartridge.style.paddingLeft = "0px";
  customCartridge.style.paddingTop = "0px";
  customCartridge.innerHTML = "";
  customCartridge.style.backgroundImage = "url(Images/customizationdisk.png)";
  initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
  initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
  customCartridge.style.zIndex = "50";
  // Start movement
  moveElement = true;

  activeDisk = customCartridge;
});

customCartridge.addEventListener(events[deviceType].move, (e) => {
  // If movement is true, then set top and left to new x and y while removing the offset
  if (moveElement && customCartridge === activeDisk) {
    e.preventDefault();
    let newX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    let newY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
    let deltaX = initialX - newX;
    let deltaY = initialY - newY;
    let newTop = customCartridge.offsetTop - deltaY;
    let newLeft = customCartridge.offsetLeft - deltaX;
    
    // Adjust newTop and newLeft if they go beyond window boundaries
    const maxX = window.innerWidth - customCartridge.offsetWidth;
    const maxY = window.innerHeight - customCartridge.offsetHeight;
    newTop = Math.max(0, Math.min(newTop, maxY));
    newLeft = Math.max(0, Math.min(newLeft, maxX));

    customCartridge.style.top = newTop + "px";
    customCartridge.style.left = newLeft + "px";
    initialX = newX;
    initialY = newY;
  }
});

// Mouse up or touch end
customCartridge.addEventListener(events[deviceType].up, (stopMovement = (e) => { moveElement = false; }));

customCartridge.addEventListener("mouseleave", (e) => {
  if (moveElement && customCartridge === activeDisk) {
    customCartridge.style.left = e.clientX + 'px';
    customCartridge.style.top = e.clientY + 'px';
  }
});

customCartridge.addEventListener(events[deviceType].up, (e) => {
  
  moveElement = false;
  customCartridge.innerHTML = "?????";
  customCartridge.style.backgroundImage = "url(Images/unhelddisk.png)";

  let initialPositionSet = false;
  let initialTopOffset = null;
  // initial positioning of customcartridge
  positioncustomCartridge();

  // update position on window resize
  window.addEventListener('resize', positioncustomCartridge);
});


function positioncustomCartridge() {
  const offsetX = 486; // offset x
  const offsetY = 400; // offset y

  //if the disk is put in the drive
  if (isCollide(customCartridge, floppyDrive) && customPage.style.display != 'block') {
    diskOverride();
    
    //scrollbar
    const scrollboxStyle = document.createElement("style");
    scrollboxStyle.innerHTML = `
    .scrollbox::-webkit-scrollbar {
     width: 25px; /* Adjust the width as needed */
     border-radius: 0.5%;
    }

    .scrollbox::-webkit-scrollbar-track {
      background-image: url("Images/gradient.gif");
      background-size: .1vw;
      background-repeat: repeat;
    }

    .scrollbox::-webkit-scrollbar-thumb {
      border-radius: 0.5%;
      background-image: url("Images/barf.png");
      background-size: .1vw;
      background-repeat: repeat;
    }

   .scrollbox::-webkit-scrollbar-thumb:hover {
      background: rgb(27, 23, 31);
      background-size: 3%;
      background-repeat: repeat;
     border-radius: 0.2%;
    }
    `;
    document.head.appendChild(scrollboxStyle);
    //endscrollbarstuff
    scrollbox.style.backgroundImage = "url(Images/crazy.gif)";
    scrollbox.style.backgroundRepeat = "repeat";
    scrollbox.style.backgroundSize = "6%";
    customPage.style.display = 'block';
    floppyDrive.style.backgroundImage="url(Images/diskdriveON0.png)";
    const floppyDriveRect = floppyDrive.getBoundingClientRect();
    const customCartridgeRect = customCartridge.getBoundingClientRect();
    const targetLeft = floppyDriveRect.left + offsetX;
    const targetTop = floppyDriveRect.top + offsetY/2.2;
    const customCartridgeLeft = targetLeft - window.scrollX - customCartridgeRect.width / 2;
    const customCartridgeTop = targetTop - window.scrollY;
    customCartridge.style.position = 'absolute';
    //customCartridge.style.left = `${customCartridgeLeft}px`;
    //customCartridge.style.top = `${customCartridgeTop}px`;
    customCartridge.style.left = "38vw"; 
    customCartridge.style.top = "42vw";
  }
  else{

    customCartridge.style.left="1%";
    customCartridge.style.top="48%";
    customCartridge.style.zIndex="6";
    customPage.style.display = 'none';
    customCartridge.style.width="15vw";
    customCartridge.style.height="3.8vw";
    customCartridge.style.paddingLeft="3%";
    customCartridge.style.paddingTop=".6%";
    customCartridge.style.backgroundImage="url(Images/unhelddisk.png)";
    customCartridge.innerHTML = "?????";

    var backgroundImage = scrollbox.style.backgroundImage;
    if (backgroundImage.includes("Images/crazy.gif")) {
      scrollbox.style.backgroundImage = "url(Images/nodisk.gif)";
      scrollbox.style.backgroundSize="cover";
      floppyDrive.style.backgroundImage="url(Images/diskdrive0.png)";
    }
    
  }
  customCartridge.style.width="15vw";
  customCartridge.style.height="3.8vw";
  customCartridge.style.paddingLeft="3%";
  customCartridge.style.paddingTop=".6%";
}


//collision detection
function isCollide(a, b) {
  var aRect = a.getBoundingClientRect();
  var bRect = b.getBoundingClientRect();

  return !(
      ((aRect.top + aRect.height) < (bRect.top)) ||
      (aRect.top > (bRect.top + bRect.height)) ||
      ((aRect.left + aRect.width) < bRect.left) ||
      (aRect.left > (bRect.left + bRect.width))
  );
}

//makes other cartridges go away when you put another in, yknow, resets stuff
function diskOverride(){
  floppyDrive.style.backgroundImage="url(Images/diskdrive0.png)";

  if (!scrollbox.style.backgroundImage.includes("Images/bcgrnd0.jpg")) {
    scrollbox.scrollTop = 0; // resets scrollbar
  }


  aboutMeCartridge.style.left="1%";
  aboutMeCartridge.style.top="4%";
  aboutMeCartridge.style.zIndex="6";
  aboutMePage.style.display = 'none';
  aboutMeCartridge.style.width="15vw";
  aboutMeCartridge.style.height="3.8vw";
  aboutMeCartridge.style.paddingLeft="3%";
  aboutMeCartridge.style.paddingTop=".6%";
  aboutMeCartridge.style.backgroundImage="url(Images/unhelddisk.png)";
  aboutMeCartridge.innerHTML = "About Me";
  
  projectsCartridge.style.left="1%";
  projectsCartridge.style.top="15%";
  projectsCartridge.style.zIndex="6";
  projectsPage.style.display = 'none';
  projectsCartridge.style.width="15vw";
  projectsCartridge.style.height="3.8vw";
  projectsCartridge.style.paddingLeft="3%";
  projectsCartridge.style.paddingTop=".6%";
  projectsCartridge.style.backgroundImage="url(Images/unhelddisk.png)";
  projectsCartridge.innerHTML = "Projects";

  researchCartridge.style.left="1%";
  researchCartridge.style.top="26%";
  researchCartridge.style.zIndex="6";
  researchPage.style.display = 'none';
  researchCartridge.style.width="15vw";
  researchCartridge.style.height="3.8vw";
  researchCartridge.style.paddingLeft="3%";
  researchCartridge.style.paddingTop=".6%";
  researchCartridge.style.backgroundImage="url(Images/unhelddisk.png)";
  researchCartridge.innerHTML = "Research";

  contactCartridge.style.left="1%";
  contactCartridge.style.top="37%";
  contactCartridge.style.zIndex="6";
  contactPage.style.display = 'none';
  contactCartridge.style.width="15vw";
  contactCartridge.style.height="3.8vw";
  contactCartridge.style.paddingLeft="3%";
  contactCartridge.style.paddingTop=".6%";
  contactCartridge.style.backgroundImage="url(Images/unhelddisk.png)";
  contactCartridge.innerHTML = "Contact";

  customCartridge.style.left="1%";
  customCartridge.style.top="48%";
  customCartridge.style.zIndex="6";
  customPage.style.display = 'none';
  customCartridge.style.width="15vw";
  customCartridge.style.height="3.8vw";
  customCartridge.style.paddingLeft="3%";
  customCartridge.style.paddingTop=".6%";
  customCartridge.style.backgroundImage="url(Images/unhelddisk.png)";
  customCartridge.innerHTML = "?????";


}

  
//silly page stuff
function randomBackground(){
  //ensures that the background changes when you hit the button
  randomint = Math.floor(Math.random() * (backgrounds.length));
  while(randomint == currentBackground){
    randomint = Math.floor(Math.random() * (backgrounds.length));
  }

  currentBackground = randomint;
  document.body.style.backgroundImage = `url(${backgrounds[randomint]})`;
}

function randomBorder(){
  //creates a random color then assigns it to the border
  let red=(Math.floor(Math.random() * 255));
  let green=(Math.floor(Math.random() * 255));
  let blue=(Math.floor(Math.random() * 255));
  scrollbox.style.borderColor = `rgb(${red},${green},${blue})`;
}
