package com.tka.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tka.dao.JobPostingDaoImpl; // Ensure the package path is correct
import com.tka.entity.JobPosting; // Assuming you have a JobPosting entity

import java.util.List;

@Service
public class JobPostingServiceImpl {

    @Autowired
    private JobPostingDaoImpl daoImpl;

    public JobPosting createJobPosting(JobPosting jobPosting) {
        return daoImpl.createJobPosting(jobPosting);
    }

    public List<JobPosting> getAllJobPostings() {
        return daoImpl.getAllJobPostings();
    }

    public JobPosting updateJobPosting(JobPosting jobPosting) {
        return daoImpl.updateJobPosting(jobPosting);
    }

    public String deleteJobPosting(Long id) {
        return daoImpl.deleteJobPosting(id);
    }
}
