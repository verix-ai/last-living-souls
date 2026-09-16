/** Small code-native pixel props share the travelers' scale and feet baseline. */
export default function StageInstrument({ member }: { member: string }) {
  return <svg className={`stage-instrument instrument-${member}`} viewBox="0 0 96 100" fill="none" shapeRendering="crispEdges" aria-hidden="true">
    {member === 'daniel' && <g className="vocal-mic"><path d="M60 17H63V92H60ZM51 92H72V95H51ZM60 22H71V25H60Z" fill="#b3aec2" /><path d="M51 14H66V20H51Z" fill="#15101f" /><path d="M51 14H57V20H51Z" fill="#e8d6c5" /></g>}
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
      <path d="M10 48H86V51H91V68H5V51H10Z" fill="#171322" />
      <path d="M12 49H84V52H88V56H8V52H12Z" fill="#6f587e" />
      <path d="M9 55H87V67H9Z" fill="#30273f" />
      <path d="M11 55H85V58H11Z" fill="#a38aa9" />
      <path d="M15 61H32V63H15ZM63 61H80V63H63Z" fill="#171322" />
      <path d="M45 60H51V63H45Z" fill="#b9bdba" />
      <path className="keys-hand hand-left" d="M28 45H38V52H28Z" fill="#805036" /><path className="keys-hand hand-right" d="M55 45H65V52H55Z" fill="#805036" />

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
