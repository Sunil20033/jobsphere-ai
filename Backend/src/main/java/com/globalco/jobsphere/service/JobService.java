package com.globalco.jobsphere.service;

import com.globalco.jobsphere.entity.Job;
import com.globalco.jobsphere.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    // Get all jobs
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // Get job by ID
    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    // Add new job
    public Job addJob(Job job) {
        return jobRepository.save(job);
    }

    // Update job
    public Job updateJob(Long id, Job updatedJob) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setTitle(updatedJob.getTitle());
        job.setCompany(updatedJob.getCompany());
        job.setLocation(updatedJob.getLocation());
        job.setSalary(updatedJob.getSalary());
        job.setDescription(updatedJob.getDescription());

        return jobRepository.save(job);
    }

    // Delete job
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}