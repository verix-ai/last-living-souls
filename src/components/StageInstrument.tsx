/** Small code-native pixel props share the travelers' scale and feet baseline. */
export default function StageInstrument({ member }: { member: string }) {
  const guitar = member === 'daniel' || member === 'drew'
  return <svg className={`stage-instrument instrument-${member}`} viewBox="0 0 96 100" fill="none" shapeRendering="crispEdges" aria-hidden="true">
    {guitar && <>
      <path d="M23 2H27V8H31V16H35V24H39V34H35V26H31V18H27V10H23Z" fill="#211b2b" />
      <path d="M20 35H30V29H39V35H47V42H51V54H46V61H22V57H14V48H17V39H20Z" fill="#15101f" />
      <path d="M22 38H31V33H37V39H45V45H47V52H42V57H24V53H18V46H22Z" fill={member === 'drew' ? '#ddb66e' : '#d279ad'} />
      <path d="M27 42H35V38H43V45H39V52H28Z" fill="#f0d8aa" />
      <path d="M35 41H41V35H47V29H53V23H59V17H65V11H71V5H79V13H73V19H67V25H61V31H55V37H49V43H43V49H35Z" fill="#211a29" />
      <path d="M39 41H43V35H49V29H55V23H61V17H67V11H72V15H69V21H63V27H57V33H51V39H45V45H39Z" fill="#a67859" />
      <path d="M69 7H79V13H75V17H69Z" fill="#e5c18a" />
      <path d="M72 5H75V9H72ZM79 8H83V11H79ZM66 13H70V16H66Z" fill="#eee2bf" />
      <path d="M24 48H31V51H24ZM33 43H38V47H33Z" fill="#382c39" />
      <path className="strum-hand" d="M26 36H32V39H36V44H30V41H26Z" fill="#c69473" />
      <path d="M51 25H57V31H51Z" fill="#c69473" />
      {member === 'daniel' && <g className="vocal-mic"><path d="M60 17H63V92H60ZM51 92H72V95H51ZM60 22H71V25H60Z" fill="#b3aec2" /><path d="M51 14H66V20H51Z" fill="#15101f" /><path d="M51 14H57V20H51Z" fill="#e8d6c5" /></g>}
    </>}
    {member === 'norris' && <>
      <path d="M14 59H43V82H38V95H21V82H16ZM52 51H82V77H77V95H59V77H54Z" fill="#171322" />
      <path d="M19 63H39V78H35V90H24V78H21ZM57 55H78V75H73V90H63V75H59Z" fill="#bb704a" />
      <path d="M23 64H28V78H25ZM62 56H67V78H64Z" fill="#e3a465" />
      <path d="M14 58H43V66H14ZM52 50H82V58H52Z" fill="#e5cf9e" />
      <path d="M14 66H43V70H14ZM52 58H82V62H52ZM21 83H38V87H21ZM59 81H77V85H59Z" fill="#564957" />
      <path className="conga-hand hand-left" d="M20 52H31V59H20Z" fill="#d8a487" />
      <path className="conga-hand hand-right" d="M61 44H72V51H61Z" fill="#d8a487" />
    </>}
    {member === 'zane' && <>
      <path d="M25 66H31V71H37V76H43V81H49V86H55V91H67V95H55V92H49V87H43V82H37V77H31V72H25ZM65 66H71V72H65V77H59V82H53V87H47V92H41V95H29V91H41V86H47V81H53V76H59V71H65Z" fill="#aaa0b9" />
      <g transform="translate(0 22)">
      <path d="M5 28H91V49H5Z" fill="#15121e" /><path d="M8 30H88V37H8Z" fill="#756088" />
      <path d="M9 38H87V46H9Z" fill="#fff0cf" />
      {Array.from({ length: 13 }, (_, i) => <path key={i} d={`M${13 + i * 6} 38V46`} stroke="#4b3f5c" />)}
      {Array.from({ length: 10 }, (_, i) => <rect key={i} x={13 + i * 7} y="38" width="3" height="5" fill="#21192e" />)}
      <path d="M72 32H84V35H72Z" fill="#a9d7c7" /><path d="M12 32H16V35H12ZM20 32H24V35H20Z" fill="#e5af77" />
      <path className="keys-hand hand-left" d="M28 29H38V37H28Z" fill="#805036" /><path className="keys-hand hand-right" d="M55 29H65V37H55Z" fill="#805036" />
      </g>
    </>}
    {member === 'dan' && <>
      <path d="M12 18H15V84H12ZM5 84H23V87H5ZM81 14H84V84H81ZM74 84H92V87H74Z" fill="#b6a7b9" />
      <path d="M1 17H26V21H1ZM6 14H21V17H6ZM69 13H96V17H69ZM75 10H90V13H75Z" fill="#e7ba76" />
      <path d="M19 39H42V62H19ZM53 36H77V60H53Z" fill="#171220" /><path d="M22 43H39V58H22ZM56 40H74V56H56Z" fill="#bc6493" />
      <path d="M19 39H42V44H19ZM53 36H77V41H53Z" fill="#dbbfd4" />
      <path d="M33 53H62V57H69V64H73V84H69V91H62V95H33V91H26V84H22V64H26V57H33Z" fill="#1c1528" />
      <path d="M35 58H60V62H65V67H68V81H64V86H59V90H36V86H30V81H27V67H31V62H35Z" fill="#d494b5" />
      <path d="M37 63H57V67H62V81H57V85H37V81H32V67H37Z" fill="#34203e" />
      <path d="M46 68H49V73H54V76H49V81H46V76H41V73H46Z" fill="#f6d7a3" />
      <path className="drumstick hand-left" d="M25 18H28V25H31V32H34V39H31V34H28V27H25Z" fill="#f0c899" />
      <path className="drumstick hand-right" d="M66 16H69V25H66V32H63V39H60V31H63V24H66Z" fill="#f0c899" />
    </>}
  </svg>
}
