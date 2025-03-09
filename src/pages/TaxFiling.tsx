// Import the confetti utility at the top of the file with other imports
import { triggerConfetti } from "@/utils/confetti";
import { useToast } from "@/hooks/use-toast";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaxFiling = () => {
  // Add toast to the existing hooks
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    taxYear: '',
    incomeType: '',
    cnic: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    occupation: '',
    totalIncome: '',
    taxPaid: '',
    taxPayable: '',
    taxRefund: '',
    bankAccounts: [],
    deductions: '',
    investments: '',
    taxCredits: '',
    taxExemptions: '',
    taxRebates: '',
    taxAdjustments: '',
    taxLiabilities: '',
    taxAssets: '',
    taxDebts: '',
    taxReturnsFiled: '',
    taxAssessments: '',
    taxAudits: '',
    taxAppeals: '',
    taxLitigation: '',
    taxRulings: '',
    taxRegulations: '',
    taxTreaties: '',
    taxAgreements: '',
    taxLaws: '',
    taxPolicies: '',
    taxForms: '',
    taxSchedules: '',
    taxReceipts: '',
    taxInvoices: '',
    taxStatements: '',
    taxRecords: '',
    taxDocuments: '',
    taxFilings: '',
    taxPayments: '',
    taxRefunds: '',
    taxPenalties: '',
    taxInterest: '',
    taxCreditsClaimed: '',
    taxDeductionsClaimed: '',
    taxExemptionsClaimed: '',
    taxRebatesClaimed: '',
    taxAdjustmentsClaimed: '',
    taxLiabilitiesPaid: '',
    taxAssetsDeclared: '',
    taxDebtsDeclared: '',
    taxReturnsFiledOnTime: '',
    taxAssessmentsChallenged: '',
    taxAuditsConducted: '',
    taxAppealsFiled: '',
    taxLitigationInitiated: '',
    taxRulingsObtained: '',
    taxRegulationsCompliedWith: '',
    taxTreatiesUtilized: '',
    taxAgreementsEnteredInto: '',
    taxLawsCompliedWith: '',
    taxPoliciesFollowed: '',
    taxFormsCompleted: '',
    taxSchedulesCompleted: '',
    taxReceiptsRetained: '',
    taxInvoicesRetained: '',
    taxStatementsRetained: '',
    taxRecordsMaintained: '',
    taxDocumentsMaintained: '',
    taxFilingsSubmitted: '',
    taxPaymentsMade: '',
    taxRefundsReceived: '',
    taxPenaltiesIncurred: '',
    taxInterestPaid: '',
    taxPlanningStrategies: '',
    taxPlanningObjectives: '',
    taxPlanningGoals: '',
    taxPlanningOutcomes: '',
    taxPlanningResults: '',
    taxPlanningBenefits: '',
    taxPlanningCosts: '',
    taxPlanningRisks: '',
    taxPlanningAssumptions: '',
    taxPlanningConstraints: '',
    taxPlanningAlternatives: '',
    taxPlanningRecommendations: '',
    taxPlanningImplementation: '',
    taxPlanningMonitoring: '',
    taxPlanningEvaluation: '',
    taxPlanningDocumentation: '',
    taxPlanningCommunication: '',
    taxPlanningCoordination: '',
    taxPlanningCollaboration: '',
    taxPlanningConsultation: '',
    taxPlanningAdvice: '',
    taxPlanningGuidance: '',
    taxPlanningSupport: '',
    taxPlanningAssistance: '',
    taxPlanningExpertise: '',
    taxPlanningKnowledge: '',
    taxPlanningSkills: '',
    taxPlanningTools: '',
    taxPlanningResources: '',
    taxPlanningProcesses: '',
    taxPlanningProcedures: '',
    taxPlanningMethods: '',
    taxPlanningTechniques: '',
    taxPlanningStrategiesUsed: '',
    taxPlanningObjectivesAchieved: '',
    taxPlanningGoalsMet: '',
    taxPlanningOutcomesRealized: '',
    taxPlanningResultsObtained: '',
    taxPlanningBenefitsReceived: '',
    taxPlanningCostsIncurred: '',
    taxPlanningRisksMitigated: '',
    taxPlanningAssumptionsValidated: '',
    taxPlanningConstraintsOvercome: '',
    taxPlanningAlternativesConsidered: '',
    taxPlanningRecommendationsImplemented: '',
    taxPlanningMonitoringPerformed: '',
    taxPlanningEvaluationConducted: '',
    taxPlanningDocumentationPrepared: '',
    taxPlanningCommunicationEffectively: '',
    taxPlanningCoordinationSeamlessly: '',
    taxPlanningCollaborationSuccessfully: '',
    taxPlanningConsultationSought: '',
    taxPlanningAdviceReceived: '',
    taxPlanningGuidanceFollowed: '',
    taxPlanningSupportProvided: '',
    taxPlanningAssistanceRendered: '',
    taxProfessionalName: '',
    taxProfessionalContact: '',
    taxProfessionalCredentials: '',
    taxProfessionalExperience: '',
    taxProfessionalExpertise: '',
    taxProfessionalKnowledge: '',
    taxProfessionalSkills: '',
    taxProfessionalTools: '',
    taxProfessionalResources: '',
    taxProfessionalProcesses: '',
    taxProfessionalProcedures: '',
    taxProfessionalMethods: '',
    taxProfessionalTechniques: '',
    taxProfessionalStrategies: '',
    taxProfessionalObjectives: '',
    taxProfessionalGoals: '',
    taxProfessionalOutcomes: '',
    taxProfessionalResults: '',
    taxProfessionalBenefits: '',
    taxProfessionalCosts: '',
    taxProfessionalRisks: '',
    taxProfessionalAssumptions: '',
    taxProfessionalConstraints: '',
    taxProfessionalAlternatives: '',
    taxProfessionalRecommendations: '',
    taxProfessionalImplementation: '',
    taxProfessionalMonitoring: '',
    taxProfessionalEvaluation: '',
    taxProfessionalDocumentation: '',
    taxProfessionalCommunication: '',
    taxProfessionalCoordination: '',
    taxProfessionalCollaboration: '',
    taxProfessionalConsultation: '',
    taxProfessionalAdvice: '',
    taxProfessionalGuidance: '',
    taxProfessionalSupport: '',
    taxProfessionalAssistance: '',
    taxProfessionalFeedback: '',
    taxProfessionalSuggestions: '',
    taxProfessionalInsights: '',
    taxProfessionalObservations: '',
    taxProfessionalAssessments: '',
    taxProfessionalAnalyses: '',
    taxProfessionalEvaluations: '',
    taxProfessionalRecommendationsProvided: '',
    taxProfessionalImplementationAssisted: '',
    taxProfessionalMonitoringConducted: '',
    taxProfessionalEvaluationPerformed: '',
    taxProfessionalDocumentationPrepared: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const generateTaxReport = (data) => {
    console.log('Tax report data:', data);
  };

  // Fix the handleSubmit function to use confetti and show a success toast
  const handleSubmit = () => {
    if (!formData.taxYear || !formData.incomeType) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Generate tax report
    generateTaxReport(formData);
    
    // Trigger confetti animation
    triggerConfetti();
    
    // Show success toast
    toast({
      title: "Tax Return Submitted!",
      description: "Your tax return has been successfully submitted.",
      variant: "success",
    });
    
    navigate('/dashboard');
  };

  // Fix the JSON parsing for arrays in the useEffect for localStorage
  useEffect(() => {
    const savedFormData = localStorage.getItem('taxFormData');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        
        // Handle the bank accounts array properly
        if (typeof parsedData.bankAccounts === 'string') {
          parsedData.bankAccounts = JSON.parse(parsedData.bankAccounts);
        }
        
        setFormData(parsedData);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
  }, []);

  // Fix the array serialization in the useEffect for saving to localStorage
  useEffect(() => {
    // Only save if there's actually data to save
    if (Object.keys(formData).length > 0) {
      const dataToSave = { ...formData };
      
      // Convert arrays to strings if needed
      if (Array.isArray(dataToSave.bankAccounts)) {
        localStorage.setItem('taxFormData', JSON.stringify(dataToSave));
      }
    }
  }, [formData]);

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Tax Filing Form</CardTitle>
          <CardDescription>Fill out the form below to file your taxes.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="taxYear">Tax Year</Label>
              <Input type="text" id="taxYear" name="taxYear" value={formData.taxYear} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="incomeType">Income Type</Label>
              <Select onValueChange={(value) => handleChange({ target: { name: 'incomeType', value } })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select income type" defaultValue={formData.incomeType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salaried-low">Salaried Individual (Basic Salary {'<'} Rs. 100k)</SelectItem>
                  <SelectItem value="salaried-high">Salaried Individual (Basic Salary {'>'}Rs. 100k)</SelectItem>
                  <SelectItem value="business">Business Income</SelectItem>
                  <SelectItem value="rental">Rental Income</SelectItem>
                  <SelectItem value="capital-gains">Capital Gains</SelectItem>
                  <SelectItem value="other">Other Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cnic">CNIC</Label>
              <Input type="text" id="cnic" name="cnic" value={formData.cnic} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input type="text" id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="totalIncome">Total Income</Label>
              <Input type="number" id="totalIncome" name="totalIncome" value={formData.totalIncome} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="taxPaid">Tax Paid</Label>
              <Input type="number" id="taxPaid" name="taxPaid" value={formData.taxPaid} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="taxPayable">Tax Payable</Label>
              <Input type="number" id="taxPayable" name="taxPayable" value={formData.taxPayable} onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label htmlFor="electricityBills" className="cursor-pointer">Electricity Bills (WHT if {'>'}Rs. 25k/month)</Label>
            <Input type="number" id="electricityBills" name="electricityBills" value={formData.electricityBills} onChange={handleChange} />
          </div>

          <Button onClick={handleSubmit}>Submit Tax Return</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxFiling;
