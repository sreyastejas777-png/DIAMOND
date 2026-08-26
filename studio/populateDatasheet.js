import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const datasheetDoc = {
  _type: 'technicalDatasheet',
  title: 'CALOR MEGA Batch System Parameters',
  specs: [
    { _key: '1', category: 'Construction', details: 'Double-walled SS304. Reinforced framing.' },
    { _key: '2', category: 'Insulation', details: '75mm high-density rockwool / mineral wool.' },
    { _key: '3', category: 'Control System', details: 'PID Digital Controller. Pt100 RTD sensor.' },
    { _key: '4', category: 'Capacity', details: '50 kg, 100 kg, 200 kg, 500 kg, and custom.' },
    { _key: '5', category: 'Drying Trays', details: 'Removable SS304 mesh tray racks.' },
    { _key: '6', category: 'Heating', details: 'Finned stainless steel armored electric.' },
    { _key: '7', category: 'Airflow', details: 'Direct-drive axial flow fans.' },
    { _key: '8', category: 'Temperature', details: 'Ambient to 90°C (±1°C accuracy).' }
  ]
}

async function run() {
  try {
    console.log('Creating technical datasheet document in Sanity...')
    const res = await client.create(datasheetDoc)
    console.log('Success! Datasheet was created with document ID:', res._id)
  } catch (err) {
    console.error('Error creating datasheet:', err)
  }
}

run()
