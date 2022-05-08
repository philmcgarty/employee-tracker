INSERT INTO department (name)
VALUES
    ('Management'),
    ('Engineering'),
    ('Safety'),
    ('Admin'),
    ('Other');

INSERT INTO role (title, salary, department_id)
VALUES
    ('CEO', 1000000, 1),
    ('Senior Manager', 500000, 1),
    ('Nuclear Engineer', 150000, 2),
    ('Technical Intern', 50000, 3),
    ('Safety Technician', 100000, 3),
    ('Retailer', 40000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Monty', 'Burns', 1, NULL),
    ('Waylon', 'Smithers', 2, 1),
    ('Homer', 'Simpson', 5, 2),
    ('Carl', 'Carlson', 3, 2),
    ('Lenny', 'Leonard', 3, 2),
    ('Ned', 'Flanders', 6, NULL),
    ('Comicbook', 'Guy', 6, NULL),
    ('Lisa', 'Simpson', 4, 4);
