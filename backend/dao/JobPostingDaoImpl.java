package com.tka.dao;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tka.entity.JobPosting;

@Repository
public class JobPostingDaoImpl {

    @Autowired
    private SessionFactory factory;

    // Method to create a new job posting
    public JobPosting createJobPosting(JobPosting jobPosting) {
        Transaction transaction = null;

        try (Session session = factory.openSession()) {
            transaction = session.beginTransaction();

            session.save(jobPosting);  // Hibernate inserts and populates ID

            transaction.commit();

            return jobPosting;   // ✅ Return the saved object with ID
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
            return null;  // Or throw a custom exception
        }
    }

    // Method to read a job posting by ID
    public JobPosting getJobPostingById(Long id) {
        try (Session session = factory.openSession()) {
            return session.get(JobPosting.class, id); // Retrieve job posting by ID
        }
    }

    // Method to update an existing job posting
    public JobPosting updateJobPosting(JobPosting jobPosting) {
        Transaction transaction = null;
        try (Session session = factory.openSession()) {
            transaction = session.beginTransaction();

            // First, fetch existing job
            JobPosting existingJob = session.get(JobPosting.class, jobPosting.getId());
            if (existingJob == null) return null; // Not found

            // Update fields
            existingJob.setJobTitle(jobPosting.getJobTitle());
            existingJob.setCompanyName(jobPosting.getCompanyName());
            existingJob.setJobDescription(jobPosting.getJobDescription());
            existingJob.setJobLocation(jobPosting.getJobLocation());
            existingJob.setEligibilityCriteria(jobPosting.getEligibilityCriteria());

            session.update(existingJob);
            transaction.commit();

            return existingJob; // Return updated object
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
            return null;
        }
    }

    // Method to delete a job posting by ID
    public String deleteJobPosting(Long id) {
        Transaction transaction = null;
        try (Session session = factory.openSession()) {
            transaction = session.beginTransaction();
            JobPosting jobPosting = session.get(JobPosting.class, id);
            if (jobPosting != null) {
                session.delete(jobPosting); // Delete the jobPosting object
                transaction.commit();
                return "Job posting deleted successfully"; // Return success message
            } else {
                return "Job posting not found"; // Return not found message
            }
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
            return "Error deleting job posting: " + e.getMessage(); // Return error message
        }
    }

    // Method to retrieve all job postings
    @SuppressWarnings("unchecked")
    public List<JobPosting> getAllJobPostings() {
        try (Session session = factory.openSession()) {
            return session.createQuery("FROM JobPosting").list(); // Retrieve all job postings
        }
    }
}
