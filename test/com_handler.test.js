const { refreshPorts } = require('../app/controller/com_handler');
const { updateMachineType } = require('../app/controller/com_handler');
const comHandler = require('../app/controller/com_handler');
const { JSDOM } = require('jsdom');


// Test generated using Keploy


test('test_refreshPorts_calls_getAvailablePorts', () => {
  const getAvailablePortsMock = jest.fn();
  global.getAvailablePorts = getAvailablePortsMock;

  refreshPorts();

  expect(getAvailablePortsMock).toHaveBeenCalled();
});


// Test generated using Keploy


test('test_updateMachineType_calls_getMachinePlugins', () => {
  const getMachinePluginsMock = jest.fn();
  global.getMachinePlugins = getMachinePluginsMock;

  updateMachineType();

  expect(getMachinePluginsMock).toHaveBeenCalled();
});


// Test generated using Keploy



test('test_createJob_sets_knit_job_id', () => {
  const createKnitJobMock = jest.fn(() => 'mockJobId');
  global.createKnitJob = createKnitJobMock;

  const dom = new JSDOM(`<!DOCTYPE html>
    <select id="port_list">
      <option value="port1">Port 1</option>
    </select>
  `);
  global.document = dom.window.document;
  global.window = dom.window;

  comHandler.createJob();

  expect(createKnitJobMock).toHaveBeenCalledWith('dummy', 'port1');
  expect(comHandler.knit_job_id).toBe('mockJobId');
});


// Test generated using Keploy



jest.useFakeTimers();

test('test_configureKnit_updates_buttons_and_calls_configKnitJob', () => {
  const configKnitJobMock = jest.fn();
  const initKnitJobMock = jest.fn();
  global.configKnitJob = configKnitJobMock;
  global.initKnitJob = initKnitJobMock;

  const dom = new JSDOM(`<!DOCTYPE html>
    <button id="configure-btn"></button>
    <button id="start-btn"></button>
    <table id="previewTable"><tr></tr><tr></tr></table>
    <canvas id="canvas2"></canvas>
  `);
  global.document = dom.window.document;
  global.window = dom.window;

  const canvas = document.getElementById('canvas2');
  canvas.toDataURL = jest.fn(() => 'mockDataUrl');

  comHandler.knit_job_id = 'mockJobId';

  comHandler.configureKnit();

  expect(document.getElementById('configure-btn').disabled).toBe(true);
  expect(document.getElementById('start-btn').disabled).toBe(false);
  expect(initKnitJobMock).toHaveBeenCalledWith('mockJobId');

  jest.runAllTimers();

  expect(configKnitJobMock).toHaveBeenCalledWith('mockJobId', 'mockDataUrl', 2, 'embedded');
});


// Test generated using Keploy



test('test_startKnit_updates_buttons_and_calls_knitJob', () => {
  const knitJobMock = jest.fn();
  global.knitJob = knitJobMock;

  const dom = new JSDOM(`<!DOCTYPE html>
    <button id="pause-btn"></button>
    <button id="stop-btn"></button>
    <button id="start-btn"></button>
  `);
  global.document = dom.window.document;
  global.window = dom.window;

  comHandler.knit_job_id = 'mockJobId';

  comHandler.startKnit();

  expect(document.getElementById('pause-btn').disabled).toBe(false);
  expect(document.getElementById('stop-btn').disabled).toBe(false);
  expect(document.getElementById('start-btn').disabled).toBe(true);

  expect(knitJobMock).toHaveBeenCalledWith('mockJobId');
});

