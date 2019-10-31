export class Sensor {
  organizationId: string;
  locationId: string;
  gwSerialNumber: string;
  gwLocationId: string;
  serialNumber: string;
  sensorName: string;
  sensorTypeId: string;
  modelNumber: string;
  description: string;
  sensorSignalMapping: {
    signalId: string;
    uoM: string;
    precision: string;
    min: string;
    max: string
  }
}
