const schedule = require('node-schedule');
const { remove } = require('lodash');

const jobs = [];

function scheduleJob(jobkey, cron, job) {
  jobs.push(new function () {
    this.start_at = new Date().getTime();
    this.jobkey = jobkey;
    this.cron = cron;
    this.count = 0;
    this.job = schedule.scheduleJob(cron, () => {
      this.count += 1;
      job();
    });
  });
}

function cancelJob(jobkey) {
  for (let job of jobs) {
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
