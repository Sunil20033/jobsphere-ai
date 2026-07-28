package com.globalco.jobsphere.repository;

import com.globalco.jobsphere.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {

}