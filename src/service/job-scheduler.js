const schedule = require('node-schedule');
const { remove } = require('lodash');

const jobs = [];

function scheduleJob(jobkey, cron, job) {
  jobs.push({
    jobkey: jobkey,
    cron: cron,
    job: schedule.scheduleJob(cron, job)
  });
}

function cancelJob(jobkey) {
  for(let job of jobs) {
    if (job.jobkey === jobkey) {
      job.cancel();
      remove(jobs, item => item === job);
    }
  }
}

module.exports = {
  jobs: () => jobs,
  scheduleJob,
  cancelJob
};
