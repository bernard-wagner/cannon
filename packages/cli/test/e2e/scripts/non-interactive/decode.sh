
case $1 in 
  1)
    $CANNON decode registry:2.3.0@main 0x429d7f0e696e66696e65780000000000000000000000000000000000000000000000000031333337302d4e324f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000001302e302e380000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035697066733a2f2f516d51317279676a59684347526d674444696b4d643263424875476b4e77584756585863393651784e41544b556500000000000000000000000000000000000000000000000000000000000000000000000000000000000035697066733a2f2f516d4e673252336d6f574c734d4c41564b59597a7a6f4855486a6a6d5842446e597170687653434253425857736d0000000000000000000000 --chain-id 1
    ;;
  2) 
    $CANNON decode synthetix-omnibus:3.3.4@main 0xdf16a074000000000000000000000000000000000000000000000000000000010231eaa900000000000000000000000000000000000000000000000000000000000000010000000000000000000000008700daec35af8ff88c16bdf0418774cb3d7599b40000000000000000000000000000000000000000000000003782dace9d900000 --chain-id 10
    ;; 
  3)
    $CANNON decode synthetix-omnibus:3.3.4@main 0xd3264e43000000000000000000000000000000000000000000000000000000018658200800000000000000000000000000000000000000000000000000000000000000010000000000000000000000008700daec35af8ff88c16bdf0418774cb3d7599b40000000000000000000000000000000000000000000000008ac7230489e80000 --chain-id 1
    ;;
  4)
    $CANNON decode synthetix-omnibus:3.3.4@main 0xd3264e43000000000000000000000000000000000000000000000000000000018658200800000000000000000000000000000000000000000000000000000000000000010000000000000000000000008700daec35af8ff88c16bdf0418774cb3d7599b40000000000000000000000000000000000000000000000008ac7230489e80000 --chain-id 1 --json
esac
